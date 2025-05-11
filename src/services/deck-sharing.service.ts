import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
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
import {
  NotificationPayload,
  NotificationResponse,
} from '@interfaces/notification.interface';
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
      updated_at: now,
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

  async processResponse(
    requestId: string,
    deckId: string,
    senderId: string,
    receiverId: string,
    response: NotificationResponse,
  ) {
    // Verificación de respuesta válida
    const validResponses: ResponseType[] = ['accepted', 'rejected'];
    if (!validResponses.includes(response)) {
      await this.kafkaService.publishNotification({
        user_id: receiverId,
        type: 'system',
        action: 'alert',
        title: 'Error',
        message: 'Respuesta inválida',
      });
      throw new BadRequestException(ERROR_MESSAGES.INVALID_RESPONSE.message);
    }

    // Verificación de datos de la solicitud
    const request = await this.getRequest(requestId);
    if (
      request.deckId !== deckId ||
      request.senderId !== senderId ||
      request.receiverId !== receiverId
    ) {
      const deck = await this.decksService.findOne(deckId, senderId);

      await this.kafkaService.publishNotification({
        user_id: senderId,
        type: 'system',
        action: 'alert',
        title: 'Error',
        message: 'Algo ha fallado al compartir el mazo: ' + deck.name,
      });

      await this.kafkaService.publishNotification({
        user_id: receiverId,
        type: 'system',
        action: 'alert',
        title: 'Error',
        message: 'Algo ha fallado al recibir el mazo: ' + deck.name,
      });

      throw new BadRequestException('Los datos de la solicitud no coinciden');
    }

    // Verificación de estado de la solicitud
    if (request.status !== 'pending') {
      await this.kafkaService.publishNotification({
        user_id: receiverId,
        type: 'system',
        action: 'alert',
        title: 'Error',
        message: ERROR_MESSAGES.REQUEST_ALREADY_PROCESSED.message,
      });

      throw new BadRequestException(
        ERROR_MESSAGES.REQUEST_ALREADY_PROCESSED.message,
      );
    }

    // Verificación de existencia de emisor
    try {
      const sender = await this.usersService.findOne(senderId);

      if (!sender) {
        await this.kafkaService.publishNotification({
          user_id: receiverId,
          type: 'system',
          action: 'alert',
          title: 'Error',
          message: ERROR_MESSAGES.SENDER_NOT_FOUND.message,
        });
        throw new NotFoundException(ERROR_MESSAGES.SENDER_NOT_FOUND.message);
      }
    } catch (error) {
      throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND.message);
    }

    // Verificación de existencia de rece ptor
    try {
      const receiver = await this.usersService.findOne(receiverId);

      if (!receiver) {
        await this.kafkaService.publishNotification({
          user_id: senderId,
          type: 'system',
          action: 'alert',
          title: 'Error',
          message: ERROR_MESSAGES.RECEIVER_NOT_FOUND.message,
        });
        throw new NotFoundException(ERROR_MESSAGES.RECEIVER_NOT_FOUND.message);
      }
    } catch (error) {
      throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND.message);
    }

    // Clona el mazo si la respuesta es aceptada
    if (response === 'accepted') {
      await this.decksService.cloneDeck(deckId, senderId, receiverId);
    }

    // Actualiza el estado de la solicitud
    await this.deckShareRequestModel.updateOne(
      { requestId },
      { $set: { status: response } },
    );

    // Envía notificaciones exitosas al emisor y receptor
    const deck = await this.decksService.findOne(deckId, senderId);
    const receiver = await this.usersService.findOne(receiverId);

    await this.kafkaService.publishNotification({
      user_id: senderId,
      type: 'deck_share_response',
      status: response,
      metadata: {
        deck_name: deck.name,
        deck_color: deck.color,
        username: receiver.username,
      },
      created_at: new Date(),
    });

    await this.kafkaService.publishNotification({
      user_id: receiverId,
      type: 'system',
      action: 'refreshDecks',
    });

    return request;
  }
}
