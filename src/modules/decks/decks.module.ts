import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecksService } from 'src/services/decks.service';
import { DecksController } from './decks.controller';
import { Deck, DeckSchema } from './entities/deck.entity';
import { CardsModule } from '../cards/cards.module';
import { UsersService } from 'src/services/users.service';
import { UserModel } from '../users/entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { OwnershipModule } from '../ownership/ownership.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    CardsModule,
    UserModel,
    OwnershipModule
  ],
  controllers: [DecksController],
  providers: [DecksService, UsersService, AuthService],
  exports: [DecksService]
})
export class DecksModule {}
