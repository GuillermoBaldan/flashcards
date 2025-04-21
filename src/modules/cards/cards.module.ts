import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from './cards.controller';
import { CardsService } from 'src/services/cards.service';
import { DecksService } from 'src/services/decks.service';
import { AuthService } from 'src/auth/services/auth.service';
import { Card, CardSchema } from './entities/cards.entity';
import { DeckModel } from '../decks/entities/deck.entity';
import { UsersService } from 'src/services/users.service';
import { UserModel } from '../users/entities/user.entity';
import { OwnershipService } from 'src/services/ownership.service';
import { OwnershipModule } from '../ownership/ownership.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    DeckModel,
    UserModel,
    OwnershipModule
  ],
  controllers: [CardsController],
  providers: [
    CardsService, 
    DecksService,
    AuthService,
    UsersService,
    OwnershipService
  ],
  exports: [CardsService, MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])]
})
export class CardsModule {}
