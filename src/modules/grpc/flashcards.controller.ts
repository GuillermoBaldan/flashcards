import {
  Controller,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DeckSharingService } from '@services/deck-sharing.service';
import { NotificationResponse } from '@interfaces/notification.interface';

interface DeckShareResponseRequest {
  requestId: string;
  notificationId: string;
  deckId: string;
  senderId: string;
  receiverId: string;
  response: NotificationResponse;
}

interface DeckShareResponse {
  success: boolean;
  message: string;
}

@Controller()
export class FlashcardsController {
  constructor(
    @Inject(forwardRef(() => DeckSharingService))
    private readonly deckSharingService: DeckSharingService,
  ) {}

  @GrpcMethod('proto.Flashcards', 'ProcessDeckShareResponse')
  async ProcessDeckShareResponse(
    data: DeckShareResponseRequest,
  ): Promise<DeckShareResponse> {
    try {
      await this.deckSharingService.processResponse(
        data.requestId,
        data.deckId,
        data.senderId,
        data.receiverId,
        data.response as NotificationResponse,
      );

      return {
        success: true,
        message: 'Respuesta procesada exitosamente',
      };
    } catch (error) {
      throw new BadRequestException(error || 'Error al procesar la respuesta');
    }
  }
}
