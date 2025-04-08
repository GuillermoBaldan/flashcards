import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReadCardDto } from '../modules/cards/dto/read-card.dto';
import { CreateCardDto } from '../modules/cards/dto/create-card.dto';
import { UpdateCardDto } from '../modules/cards/dto/update-card.dto';
import { Card, CardDocument } from 'src/modules/cards/entities/cards.entity';
import { DecksService } from './decks.service';
import { ERROR_MESSAGES } from '../errors/error-messages';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    private readonly decksService: DecksService,
  ) {}

  async create(
    createCardDto: CreateCardDto,
    userId: string,
  ): Promise<ReadCardDto> {
    await this.decksService.verifyDeckOwnership(createCardDto.deckId, userId);

    const newCard = new this.cardModel({
      ...createCardDto,
      userId,
      difficulty: -1,
      lastReview: new Date(),
      gameOptions: createCardDto.gameOptions || {}
    });
    const savedCard = await newCard.save();

    await this.decksService.addCardToDeck(
      createCardDto.deckId,
      savedCard._id.toString(),
    );

    return {
      id: savedCard._id.toString(),
      front: savedCard.front,
      back: savedCard.back,
      deckId: savedCard.deckId,
      cardType: savedCard.cardType,
      gameOptions: savedCard.gameOptions,
      difficulty: savedCard.difficulty,
      lastReview: savedCard.lastReview
    };
  }

  async findByDeckId(deckId: string, userId: string): Promise<ReadCardDto[]> {
    const objectIdDeckId = new Types.ObjectId(deckId);
    const allCards = await this.cardModel.find().exec();
    const cards = await this.cardModel.find({ deckId: objectIdDeckId }).exec();
    
    return cards.map((card) => ({
      id: card._id.toString(),
      front: card.front,
      back: card.back,
      deckId: card.deckId.toString(),
      cardType: card.cardType,
      gameOptions: card.gameOptions,
      difficulty: card.difficulty,
      lastReview: card.lastReview
    }));
  }

  async findOne(id: string, userId: string): Promise<Card> {
    const card = await this.findCardById(id);
    this.checkCardOwnership(card, userId);
    return card;
  }

  async update(
    id: string,
    updateCardDto: UpdateCardDto,
    userId: string,
  ): Promise<Card> {
    const card = await this.findCardById(id);
    this.checkCardOwnership(card, userId);
    return this.cardModel.findByIdAndUpdate(id, updateCardDto, { new: true });
  }

  async remove(id: string, userId: string): Promise<void> {
    const card = await this.findCardById(id);
    this.checkCardOwnership(card, userId);
    const result = await this.cardModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(ERROR_MESSAGES.CARD_NOT_FOUND.message);
    }
    await this.decksService.removeCardFromDeck(card.deckId, id);
  }

  async updateCardDifficulty(cardId: string, isCorrect: boolean, userId: string): Promise<Card> {
    try {
      const card = await this.findCardById(cardId);
      this.checkCardOwnership(card, userId);
      
      if (card.difficulty === -1) {
        card.difficulty = 5;
      }

      card.difficulty = isCorrect ? 
        Math.max(0, card.difficulty - 0.85) : 
        Math.min(10, card.difficulty + 1.25); 
      
      card.lastReview = new Date();
      
      return await card.save();
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.CARD_UPDATE_FAILED.message);
    }
  }

  private async findCardById(id: string): Promise<CardDocument> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new NotFoundException(ERROR_MESSAGES.CARD_NOT_FOUND.message);
    }
    return card;
  }

  private checkCardOwnership(card: Card, userId: string): void {
    if (card.userId !== userId) {
      throw new BadRequestException(
        ERROR_MESSAGES.UNAUTHORIZED_CARD_ACCESS.message,
      );
    }
  }
}
