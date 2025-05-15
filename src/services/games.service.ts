import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from '@modules/cards/entities/cards.entity';
import { DecksService } from '@services/decks.service';
import { CardResultDto } from '@modules/game/dto/update-card-results.dto';
import { Deck, DeckDocument } from '@modules/decks/entities/deck.entity';
import { AvailableDecksResponseDto } from '@modules/game/dto/available-decks.dto';
import { OwnershipService } from '@services/ownership.service';
import { CardsService } from '@services/cards.service';
import { ERROR_MESSAGES } from '@errors/error-messages';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectModel(Deck.name) private readonly deckModel: Model<DeckDocument>,
    private readonly decksService: DecksService,
    private readonly ownershipService: OwnershipService,
    private readonly cardsService: CardsService,
  ) {}

  async startGame(deckIds: string[], userId: string) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    let cards = [];

    for (const deckId of deckIds) {
      const cardsForDeck = await this.cardsService.findByDeckId(
        deckId,
        userId,
        { nextReview: { $lte: currentTimestamp } },
      );
      cards = [...cards, ...cardsForDeck];
    }

    cards.sort((a, b) => a.nextReview - b.nextReview);

    if (cards.length === 0) {
      throw new BadRequestException('No hay cartas disponibles para jugar');
    }

    return cards.map((card) => ({
      id: card.id,
      front: card.front,
      back: card.back,
      deckId: card.deckId,
      lastReview: card.lastReview,
      nextReview: card.nextReview,
      gameOptions: card.gameOptions,
    }));
  }

  async updateCardResults(cardResults: CardResultDto[], userId: string) {
    for (const result of cardResults) {
      const card = await this.cardsService.findOne(result.cardId, userId);

      if (!card) {
        throw new NotFoundException(ERROR_MESSAGES.CARD_NOT_FOUND.message);
      }

      await this.cardsService.update(
        result.cardId,
        {
          lastReview: result.lastReview,
          nextReview: result.nextReview,
        },
        userId,
      );
    }

    return { success: true };
  }

  async getAvailableDecks(userId: string): Promise<AvailableDecksResponseDto> {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const decks = await this.deckModel.find({ userId }).exec();

    const availableDecks = decks.map((deck) => {
      const isAvailable = deck.firstCardNextReview
        ? deck.firstCardNextReview <= currentTimestamp
        : false;

      const response = {
        id: deck._id.toString(),
        name: deck.name,
        color: deck.color,
        available: isAvailable,
        firstCardNextReview: deck.firstCardNextReview,
      };

      if (!isAvailable) {
        response['reason'] =
          deck.cards_id?.length === 0
            ? 'El mazo no tiene cartas'
            : 'No hay cartas disponibles para jugar aún';
      }

      return response;
    });

    return { decks: availableDecks };
  }
}
