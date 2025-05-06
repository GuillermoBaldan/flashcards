import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERROR_MESSAGES } from '@errors/error-messages';
import { Deck, DeckDocument } from '@modules/decks/entities/deck.entity';
import { Card, CardDocument } from '@modules/cards/entities/cards.entity';

@Injectable()
export class OwnershipService {
  constructor(
    @InjectModel(Deck.name) private readonly deckModel: Model<DeckDocument>,
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
  ) {}

  async verifyDeckOwnership(deckId: string, userId: string): Promise<void> {
    const deck = await this.deckModel.findOne({ _id: deckId, userId }).exec();
    if (!deck) {
      throw new NotFoundException(ERROR_MESSAGES.DECK_NOT_FOUND.message);
    }
  }

  async verifyCardOwnership(cardId: string, userId: string): Promise<void> {
    const card = await this.cardModel.findById(cardId).exec();
    if (!card) {
      throw new NotFoundException(ERROR_MESSAGES.CARD_NOT_FOUND.message);
    }

    const deck = await this.deckModel
      .findOne({
        _id: card.deckId,
        userId,
      })
      .exec();

    if (!deck) {
      throw new BadRequestException(
        ERROR_MESSAGES.UNAUTHORIZED_CARD_ACCESS.message,
      );
    }
  }
}
