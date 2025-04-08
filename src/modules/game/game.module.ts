import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from 'src/services/games.service';
import { CardModel } from '../cards/entities/cards.entity';
import { DecksModule } from '../decks/decks.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [
    CardModel,
    DecksModule,
    AuthModule,
    UsersModule,
    CardsModule
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService]
})
export class GameModule {}
