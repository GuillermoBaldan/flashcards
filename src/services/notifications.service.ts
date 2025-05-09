import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { grpcServerOptions } from '@modules/grpc/grpc.server';
import { StatusType } from '@constants/constants';

@Injectable()
export class NotificationsGrpcService implements OnModuleInit {
  @Client(grpcServerOptions)
  private readonly client: ClientGrpc;
  private flashcardsService: any;

  onModuleInit() {
    this.flashcardsService = this.client.getService('Flashcards');
  }

  processDeckShareResponse(data: {
    requestId: string;
    deckId: string;
    senderId: string;
    receiverId: string;
    response: StatusType;
  }): Observable<any> {
    return this.flashcardsService.ProcessDeckShareResponse({
      request_id: data.requestId,
      deck_id: data.deckId,
      sender_id: data.senderId,
      receiver_id: data.receiverId,
      response: data.response,
    });
  }
}
