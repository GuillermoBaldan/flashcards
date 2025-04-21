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
import { Deck, DeckDocument } from 'src/modules/decks/entities/deck.entity';
import { DecksService } from './decks.service';
import { ERROR_MESSAGES } from '../errors/error-messages';
import { OwnershipService } from './ownership.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectModel(Deck.name) private readonly deckModel: Model<DeckDocument>,
    private readonly decksService: DecksService,
    private readonly ownershipService: OwnershipService,
  ) {}

  async create(
    createCardDto: CreateCardDto,
    userId: string,
  ): Promise<ReadCardDto> {
    await this.ownershipService.verifyDeckOwnership(createCardDto.deckId, userId);

    const card = new this.cardModel({
      ...createCardDto,
      userId
    });
    
    const savedCard = await card.save();
    
    await this.updateDeckFirstReviewDate(createCardDto.deckId, savedCard.nextReview, userId);
    
    await this.decksService.addCardToDeck(createCardDto.deckId, savedCard._id.toString());

    return {
      id: savedCard._id.toString(),
      front: savedCard.front,
      back: savedCard.back,
      deckId: savedCard.deckId,
      cardType: savedCard.cardType,
      gameOptions: savedCard.gameOptions,
      lastReview: savedCard.lastReview,
      nextReview: savedCard.nextReview
    };
  }

  async findByDeckId(deckId: string, userId: string): Promise<ReadCardDto[]> {
    const objectIdDeckId = new Types.ObjectId(deckId);
    const cards = await this.cardModel.find({ deckId: objectIdDeckId }).exec();
    
    return cards.map((card) => ({
      id: card._id.toString(),
      front: card.front,
      back: card.back,
      deckId: card.deckId.toString(),
      cardType: card.cardType,
      gameOptions: card.gameOptions,
      lastReview: card.lastReview,
      nextReview: card.nextReview,
    }));
  }

  async findOne(id: string, userId: string): Promise<Card> {
    const card = await this.findCardById(id);
    await this.ownershipService.verifyCardOwnership(id, userId);
    return card;
  }

  async update(
    id: string,
    updateCardDto: UpdateCardDto,
    userId: string,
  ): Promise<ReadCardDto> {
    const card = await this.findCardById(id);
    await this.ownershipService.verifyCardOwnership(id, userId);
    
    const updatedCard = await this.cardModel.findByIdAndUpdate(id, updateCardDto, { new: true });
    
    if (updateCardDto.nextReview) {
      await this.updateDeckFirstReviewDate(card.deckId, updateCardDto.nextReview, userId);
    }
    
    return {
      id: updatedCard._id.toString(),
      front: updatedCard.front,
      back: updatedCard.back,
      deckId: updatedCard.deckId,
      cardType: updatedCard.cardType,
      gameOptions: updatedCard.gameOptions,
      lastReview: updatedCard.lastReview,
      nextReview: updatedCard.nextReview
    };
  }

  async remove(id: string, userId: string): Promise<void> {
    const card = await this.findCardById(id);
    await this.ownershipService.verifyCardOwnership(id, userId);
    const result = await this.cardModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(ERROR_MESSAGES.CARD_NOT_FOUND.message);
    }
    await this.decksService.removeCardFromDeck(card.deckId, id);
  }

  async updateCardDifficulty(cardId: string, isCorrect: boolean, userId: string): Promise<Card> {
    const card = await this.findCardById(cardId);
    await this.ownershipService.verifyCardOwnership(cardId, userId);
    
    card.lastReview = Math.floor(Date.now() / 1000);
    return await card.save();
  }

  private async findCardById(id: string): Promise<CardDocument> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException(ERROR_MESSAGES.CARD_NOT_FOUND.message);
    }
    return card;
  }

  private async updateDeckFirstReviewDate(deckId: string, newNextReview: number, userId: string): Promise<void> {
    const deck = await this.decksService.findOne(deckId, userId);
    
    if (!deck.firstCardNextReview || newNextReview < deck.firstCardNextReview) {
      await this.deckModel.updateOne(
        { _id: deckId },
        { $set: { firstCardNextReview: newNextReview } }
      );
    }
  }
}
