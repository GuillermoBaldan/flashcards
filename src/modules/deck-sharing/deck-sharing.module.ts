import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DeckShareRequest,
  DeckShareRequestSchema,
} from './entities/deck-share-request.entity';
import { DeckSharingService } from '@services/deck-sharing.service';
import { DeckSharingController } from '@modules/deck-sharing/deck-sharing.controller';
import { UsersModule } from '@modules/users/users.module';
import { DecksModule } from '@modules/decks/decks.module';
import { KafkaModule } from '@kafka/kafka.module';
import { GrpcModule } from '@modules/grpc/grpc.module';
import { OwnershipModule } from '@modules/ownership/ownership.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeckShareRequest.name, schema: DeckShareRequestSchema },
    ]),
    UsersModule,
    DecksModule,
    KafkaModule,
    GrpcModule,
    OwnershipModule,
    AuthModule,
  ],
  providers: [DeckSharingService],
  controllers: [DeckSharingController],
  exports: [DeckSharingService],
})
export class DeckSharingModule {}
