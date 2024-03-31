import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from '../modules/cards/dto/create-card.dto';
import { UpdateCardDto } from '../modules/cards/dto/update-card.dto';
import { Card, CardDocument } from 'src/modules/cards/entities/cards.entity';
import { DecksService } from './decks.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    private readonly decksService: DecksService,
  ) {}

  async create(createCardDto: CreateCardDto, userId: string): Promise<Card> {
    await this.decksService.verifyDeckOwnership(createCardDto.deckId, userId);

    const newCard = new this.cardModel({
      ...createCardDto,
      userId,
    });
    const savedCard = await newCard.save();

    await this.decksService.addCardToDeck(createCardDto.deckId, savedCard._id);

    return savedCard;
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
      throw new NotFoundException('Card not found');
    }
    await this.decksService.removeCardFromDeck(card.deckId, id);
  }

  private async findCardById(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }

  private checkCardOwnership(card: Card, userId: string): void {
    if (card.userId !== userId) {
      throw new BadRequestException('Unauthorized access to card');
    }
  }
}
