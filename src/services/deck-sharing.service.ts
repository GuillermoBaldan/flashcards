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
import { StatusType } from '@constants/constants';
import { OwnershipService } from '@services/ownership.service';

@Injectable()
export class DeckSharingService {
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

    const request = new this.deckShareRequestModel({
      requestId: uuidv4(),
      senderId,
      receiverId,
      deckId,
      status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
    });

    await request.save();

    await this.kafkaService.publishNotification({
      type: 'deck_share_request',
      userId: receiverId,
      senderId,
      message: `${sender.username} quiere compartir el mazo "${deck.name}" contigo.`,
      metadata: {
        requestId: request.requestId,
        deckId,
        deckName: deck.name,
        deckColor: deck.color,
        senderName: sender.username,
      },
    });

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

  async processResponse(requestId: string, response: StatusType) {
    const validResponses: StatusType[] = ['accepted', 'rejected'];
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

    await this.kafkaService.publishNotification({
      type: 'deck_share_response',
      userId: request.senderId,
      message: `Tu solicitud para compartir el mazo fue ${response}`,
      metadata: {
        requestId,
        deckId: request.deckId,
        response,
      },
    });

    return request;
  }
}
