import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from 'src/modules/cards/entities/cards.entity';
import { DecksService } from 'src/services/decks.service';
import { ERROR_MESSAGES } from 'src/errors/error-messages';
import { ALLOWED_GAME_MODES, DIFFICULTY_LEVELS, ALLOWED_CARD_COUNTS } from 'src/constants/constants';
import { GAME_OPTIONS } from 'src/constants/game-options.constants';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    private readonly decksService: DecksService,
  ) {}

  async calculateAvailableCards(deckIds: string[], userId: string, gameMode: string) {
    await this.verifyDecksOwnership(deckIds, userId);
    const totalCards = await this.getUniqueCardsCount(deckIds, gameMode);
    const calibratableCards = await this.getAvailableCardsCount(deckIds, 'calibrate', gameMode);
    const easyCards = await this.getAvailableCardsCount(deckIds, 'easy', gameMode);
    const mediumCards = await this.getAvailableCardsCount(deckIds, 'medium', gameMode);
    const hardCards = await this.getAvailableCardsCount(deckIds, 'hard', gameMode);

    return {
      calibratableCards: Math.min(calibratableCards, 20),
      easy: this.getAvailableOptions(Math.min(easyCards, totalCards)),
      medium: this.getAvailableOptions(Math.min(mediumCards, totalCards)),
      hard: this.getAvailableOptions(Math.min(hardCards, totalCards))
    };
  }

  private async getAvailableCardsCount(deckIds: string[], difficulty: string, gameMode: string): Promise<number> {
    const gameModeOption = this.getGameModeOption(gameMode);
    let query: any = { 
      deckId: { $in: deckIds },
      [`gameOptions.${gameModeOption}`]: true,
    };

    let count = 0;

    switch (difficulty) {
      case 'calibrate':
        query.difficulty = -1;
        const calibrateCards = await this.cardModel.find(query).exec();
        count = calibrateCards.length;
        break;
      case 'easy':
        query.difficulty = { $lte: 5, $ne: -1 };
        const easyCards = await this.cardModel.find(query).exec();
        count = easyCards.length;
        if (count < 20) {
          query.difficulty = { $gt: 5, $ne: -1 };
          const additionalCards = await this.cardModel.find(query).exec();
          count += additionalCards.length;
        }
        break;
      case 'medium':
        query.difficulty = { $gte: 0, $lte: 10, $ne: -1 };
        const mediumCards = await this.cardModel.find(query).exec();
        count = mediumCards.length;
        break;
      case 'hard':
        query.difficulty = { $gte: 5, $ne: -1 };
        const hardCards = await this.cardModel.find(query).exec();
        count = hardCards.length;
        if (count < 20) {
          query.difficulty = { $lt: 5, $ne: -1 };
          const additionalCards = await this.cardModel.find(query).exec();
          count += additionalCards.length;
        }
        break;
    }

    return count;
  }

  private getGameModeOption(gameMode: string): string {
    if (!ALLOWED_GAME_MODES.includes(gameMode)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_GAME_MODE.message);
    }

    switch (gameMode) {
      case 'be-honest': return 'beHonest';
      case 'true-or-false': return 'trueFalse';
      case 'riddle': return 'riddle';
      default: throw new BadRequestException(ERROR_MESSAGES.INVALID_GAME_MODE.message);
    }
  }

  async startGame(gameMode: string, difficulty: string, deckIds: string[], cardCount: number, userId: string) {
    this.validateGameParameters(gameMode, difficulty, cardCount);
    await this.verifyDecksOwnership(deckIds, userId);
    const cards = await this.getCardsForGame(deckIds, difficulty, cardCount, gameMode);
    const maxCards = difficulty === 'calibrate' ? Math.min(cards.length, 20) : cardCount;
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    return {
      gameMode,
      difficulty,
      cards: shuffledCards.slice(0, maxCards).map(card => ({
        id: card._id,
        front: card.front,
        back: card.back,
        deckId: card.deckId,
        cardType: card.cardType,
        gameOptions: card.gameOptions,
        difficulty: card.difficulty,
      })),
    };
  }

  private validateGameParameters(gameMode: string, difficulty: string, cardCount: number) {
    if (!ALLOWED_GAME_MODES.includes(gameMode)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_GAME_MODE.message);
    }

    if (!DIFFICULTY_LEVELS.includes(difficulty)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_DIFFICULTY_LEVEL.message);
    }

    if (difficulty !== 'calibrate' && !ALLOWED_CARD_COUNTS.includes(cardCount)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_CARD_COUNT.message);
    }
  }

  private async verifyDecksOwnership(deckIds: string[], userId: string) {
    for (const deckId of deckIds) {
      await this.decksService.verifyDeckOwnership(deckId, userId);
    }
  }

  private async getCardsForGame(deckIds: string[], difficulty: string, cardCount: number, gameMode: string) {
    const gameModeOption = this.getGameModeOption(gameMode);
    let query: any = { 
      deckId: { $in: deckIds },
      [`gameOptions.${gameModeOption}`]: true,
    };

    if (difficulty !== 'calibrate') {
      query.difficulty = { $ne: -1 };
    }

    let sortCriteria: any = { lastReview: -1 };
    let cards: any[] = [];
    let usedCardIds = new Set();

    switch (difficulty) {
      case 'calibrate':
        query.difficulty = -1;
        cards = await this.getCardsFromQuery(query, sortCriteria, cardCount);
        break;
      case 'easy':
        query.difficulty = { $lte: 5, $ne: -1 };
        sortCriteria = { difficulty: 1 }; 
        cards = await this.getCardsFromQuery(query, sortCriteria, cardCount);
        cards.forEach(card => usedCardIds.add(card._id.toString()));
        if (cards.length < cardCount) {
          query.difficulty = { $gt: 5, $ne: -1 };
          query._id = { $nin: Array.from(usedCardIds) };
          const additionalCards = await this.getCardsFromQuery(query, sortCriteria, cardCount - cards.length);
          cards = cards.concat(additionalCards);
        }
        break;
      case 'medium':
        query.difficulty = { $gte: 0, $lte: 10, $ne: -1 };
        sortCriteria = { difficulty: 1 };
        cards = await this.getCardsFromQuery(query, sortCriteria, cardCount);
        break;
      case 'hard':
        query.difficulty = { $gte: 5, $ne: -1 };
        sortCriteria = { difficulty: -1 };
        cards = await this.getCardsFromQuery(query, sortCriteria, cardCount);
        cards.forEach(card => usedCardIds.add(card._id.toString()));
        if (cards.length < cardCount) {
          query.difficulty = { $lt: 5, $ne: -1 };
          query._id = { $nin: Array.from(usedCardIds) };
          const additionalCards = await this.getCardsFromQuery(query, sortCriteria, cardCount - cards.length);
          cards = cards.concat(additionalCards);
        }
        break;
    }

    return cards.map(card => ({
      ...card,
      gameOptions: GAME_OPTIONS[card.cardType][gameModeOption].reduce((acc, option) => {
        acc[option] = card.gameOptions[option];
        return acc;
      }, {})
    })).slice(0, cardCount);
  }

  private async getCardsFromQuery(query: any, sortCriteria: any, limit: number) {
    return this.cardModel.find(query)
      .populate({ path: 'deckId', select: 'name color' })
      .sort(sortCriteria)
      .limit(limit)
      .lean()
      .exec();
  }

  async updateCardResults(cardResults: { cardId: string; isCorrect: boolean }[], userId: string) {
    const updatePromises = cardResults.map(async (result) => {
      const card = await this.cardModel.findById(result.cardId).exec();
      if (!card) {
        throw new NotFoundException(ERROR_MESSAGES.CARD_NOT_FOUND.message);
      }
      await this.decksService.verifyDeckOwnership(card.deckId.toString(), userId);
      if (result.isCorrect) {
        card.difficulty = Math.min(card.difficulty + 1, 10);
      } else {
        card.difficulty = Math.max(card.difficulty - 1, 0);
      }
      card.lastReview = new Date();
      return card.save();
    });

    await Promise.all(updatePromises);
  }

  private async getUniqueCardsCount(deckIds: string[], gameMode: string): Promise<number> {
    const gameModeOption = this.getGameModeOption(gameMode);
    const query = {
      deckId: { $in: deckIds },
      [`gameOptions.${gameModeOption}`]: true,
    };
    return this.cardModel.countDocuments(query).exec();
  }

  private getAvailableOptions(count: number) {
    return ALLOWED_CARD_COUNTS.filter((option) => option <= count);
  }
}