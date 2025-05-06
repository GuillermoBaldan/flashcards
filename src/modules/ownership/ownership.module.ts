import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnershipService } from '@services/ownership.service';
import { Deck, DeckSchema } from '@modules/decks/entities/deck.entity';
import { Card, CardSchema } from '@modules/cards/entities/cards.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deck.name, schema: DeckSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  providers: [OwnershipService],
  exports: [OwnershipService],
})
export class OwnershipModule {}
