import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from 'src/services/cards.service';
import { DecksService } from 'src/services/decks.service';
import { AuthService } from 'src/auth/services/auth.service';
import { CardModel } from './entities/cards.entity';
import { DeckModel } from '../decks/entities/deck.entity';
import { UsersService } from 'src/services/users.service';
import { UserModel } from '../users/entities/user.entity';

@Module({
  imports: [CardModel, DeckModel, UserModel],
  controllers: [CardsController],
  providers: [
    CardsService, 
    DecksService,
    AuthService,
    UsersService
  ],
  exports: [CardsService]
})
export class CardsModule {}
