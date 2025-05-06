import { Module } from '@nestjs/common';
import { GameController } from '@modules/game/game.controller';
import { GameService } from '@services/games.service';
import { CardModel } from '@modules/cards/entities/cards.entity';
import { DecksModule } from '@modules/decks/decks.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { CardsModule } from '@modules/cards/cards.module';
import { OwnershipModule } from '@modules/ownership/ownership.module';

@Module({
  imports: [
    CardModel,
    DecksModule,
    AuthModule,
    UsersModule,
    CardsModule,
    OwnershipModule,
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
