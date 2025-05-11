import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeckShareRequest } from '../modules/deck-sharing/entities/deck-share-request.entity';
import { UsersService } from '@services/users.service';
import { DecksService } from '@services/decks.service';
import { KafkaService } from '@services/kafka.service';
import { v4 as uuidv4 } from 'uuid';
import { ERROR_MESSAGES } from '@errors/error-messages';
import { ResponseType } from '@constants/constants';
import { OwnershipService } from '@services/ownership.service';
import { Logger } from '@nestjs/common';
import { NotificationPayload } from '@interfaces/notification.interface';

@Injectable()
export class DeckSharingService {
  private readonly logger = new Logger(DeckSharingService.name);

  constructor(
    @InjectModel(DeckShareRequest.name)
    private readonly deckShareRequestModel: Model<DeckShareRequest>,
    private readonly usersService: UsersService,
    private readonly decksService: DecksService,
    private readonly kafkaService: KafkaService,
    private readonly ownershipService: OwnershipService,
  ) {}

  async createRequest(senderId: string, receiverId: string, deckId: string) {
    const existingRequest = await this.deckShareRequestModel
      .findOne({
        senderId,
        receiverId,
        deckId,
        status: 'pending',
      })
      .exec();

    if (existingRequest) {
      throw new BadRequestException(ERROR_MESSAGES.DUPLICATE_REQUEST.message);
    }

    const [sender, receiver] = await Promise.all([
      this.usersService.findOne(senderId),
      this.usersService.findOne(receiverId),
    ]);

    if (!sender || !receiver) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND.message);
    }

    if (senderId === receiverId) {
      throw new BadRequestException(ERROR_MESSAGES.SELF_REQUEST.message);
    }

    await this.ownershipService.verifyDeckOwnership(deckId, senderId);

    const deck = await this.decksService.findOne(deckId, senderId);

    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(now.getDate() + 7); // Expira en 7 días

    const request = new this.deckShareRequestModel({
      requestId: uuidv4(),
      senderId,
      receiverId,
      deckId,
      status: 'pending',
      expiresAt,
      createdAt: now,
      updatedAt: now,
    });

    await request.save();

    const notification: NotificationPayload = {
      user_id: receiverId,
      type: 'deck_share_request',
      message: `${sender.username} wants to share the deck ${deck.name} with you.`,
      status: 'pending',
      sender_id: senderId,
      metadata: {
        request_id: request.requestId,
        deck_id: deckId,
        deck_name: deck.name,
        deck_color: deck.color,
        sender_name: sender.username,
      },
      created_at: now,
      expires_at: expiresAt,
    };

    await this.kafkaService.publishNotification(notification);

    return request;
  }

  async getRequest(requestId: string): Promise<DeckShareRequest> {
    const request = await this.deckShareRequestModel
      .findOne({ requestId })
      .exec();
    if (!request) {
      throw new NotFoundException(ERROR_MESSAGES.REQUEST_NOT_FOUND.message);
    }

    if (request.expiresAt && request.expiresAt < new Date()) {
      await this.deckShareRequestModel.updateOne(
        { requestId },
        { $set: { status: 'expired' } },
      );
      throw new BadRequestException(ERROR_MESSAGES.REQUEST_EXPIRED.message);
    }

    return request;
  }

  async processResponse(requestId: string, response: ResponseType) {
    const validResponses: ResponseType[] = ['accepted', 'rejected'];
    if (!validResponses.includes(response)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_STATUS.message);
    }

    const request = await this.getRequest(requestId);

    if (request.status !== 'pending') {
      throw new BadRequestException(
        ERROR_MESSAGES.REQUEST_ALREADY_PROCESSED.message,
      );
    }

    await this.deckShareRequestModel.updateOne(
      { requestId },
      { $set: { status: 'expired' } },
    );

    const deck = await this.decksService.findOne(
      request.deckId,
      request.senderId,
    );

    const notification: NotificationPayload = {
      type: 'deck_share_response',
      user_id: request.senderId,
      message: `${request.receiverId} has ${response} your request to share the deck ${deck.name}.`,
      status: 'expired',
      metadata: {
        deck_color: deck.color,
        response,
      },
    };

    const notificationSent =
      await this.kafkaService.publishNotification(notification);

    if (!notificationSent) {
      this.logger.error('Failed to send Kafka notification for request', {
        requestId,
      });
    }

    return request;
  }
}
