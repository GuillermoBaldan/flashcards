import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecksService } from '@services/decks.service';
import { DecksController } from '@modules/decks/decks.controller';
import { Deck, DeckSchema } from '@modules/decks/entities/deck.entity';
import { CardsModule } from '@modules/cards/cards.module';
import { UsersService } from '@services/users.service';
import { UserModel } from '@modules/users/entities/user.entity';
import { AuthService } from '@auth/services/auth.service';
import { OwnershipModule } from '@modules/ownership/ownership.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    CardsModule,
    UserModel,
    OwnershipModule,
  ],
  controllers: [DecksController],
  providers: [DecksService, UsersService, AuthService],
  exports: [DecksService],
})
export class DecksModule {}
