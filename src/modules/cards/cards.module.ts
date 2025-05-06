import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from '@modules/cards/cards.controller';
import { CardsService } from '@services/cards.service';
import { DecksService } from '@services/decks.service';
import { AuthService } from '@auth/services/auth.service';
import { Card, CardSchema } from '@modules/cards/entities/cards.entity';
import { DeckModel } from '@modules/decks/entities/deck.entity';
import { UsersService } from '@services/users.service';
import { UserModel } from '@modules/users/entities/user.entity';
import { OwnershipService } from '@services/ownership.service';
import { OwnershipModule } from '@modules/ownership/ownership.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    DeckModel,
    UserModel,
    OwnershipModule,
  ],
  controllers: [CardsController],
  providers: [
    CardsService,
    DecksService,
    AuthService,
    UsersService,
    OwnershipService,
  ],
  exports: [
    CardsService,
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
})
export class CardsModule {}
