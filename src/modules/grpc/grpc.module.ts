import { Module, forwardRef } from '@nestjs/common';
import { FlashcardsController } from '@modules/grpc/flashcards.controller';
import { DeckSharingModule } from '@modules/deck-sharing/deck-sharing.module';
import { ClientsModule } from '@nestjs/microservices';
import { grpcServerOptions } from '@grpc/grpc.server';
import { NotificationsGrpcService } from '@services/notifications.service';

@Module({
  imports: [
    ClientsModule.register([grpcServerOptions]),
    forwardRef(() => DeckSharingModule),
  ],
  controllers: [FlashcardsController],
  providers: [NotificationsGrpcService],
  exports: [NotificationsGrpcService],
})
export class GrpcModule {}
