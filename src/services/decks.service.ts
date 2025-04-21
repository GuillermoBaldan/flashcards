import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck, DeckDocument } from '../modules/decks/entities/deck.entity';
import { UsersService } from './users.service';
import { ReadDeckDto } from '../modules/decks/dto/read-deck.dto';
import { CreateDeckDto } from '../modules/decks/dto/create-deck.dto';
import { UpdateDeckDto } from '../modules/decks/dto/update-deck.dto';
import { ERROR_MESSAGES } from '../errors/error-messages';
import { Card, CardDocument } from '../modules/cards/entities/cards.entity';
import { OwnershipService } from './ownership.service';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel(Deck.name) private readonly deckModel: Model<DeckDocument>,
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    private readonly usersService: UsersService,
    private readonly ownershipService: OwnershipService,
  ) {}

  async create(
    createDeckDto: CreateDeckDto,
    userId: string,
  ): Promise<ReadDeckDto> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND.message);
    }

    const existingDeck = await this.deckModel.findOne({
      userId,
      name: createDeckDto.name,
    }).exec();

    if (existingDeck) {
      throw new BadRequestException(
        ERROR_MESSAGES.DECK_NAME_ALREADY_EXISTS.message,
      );
    }

    const newDeck = new this.deckModel({
      ...createDeckDto,
      userId,
    });
    const deck = await newDeck.save();

    await this.usersService.addDeckToUser(userId, deck._id.toString());

    return {
      id: deck._id.toString(),
      name: deck.name,
      color: deck.color,
      cards_count: deck.cards_id?.length || 0,
    };
  }

  async findByUserId(userId: string): Promise<ReadDeckDto[]> {
    const decks = await this.deckModel.find({ userId }).exec();
    return decks.map((deck) => ({
      id: deck._id.toString(),
      name: deck.name,
      color: deck.color,
      cards_count: deck.cards_id?.length || 0,
    }));
  }

  async findOne(id: string, userId: string): Promise<ReadDeckDto> {
    const deck = await this.deckModel.findOne({ _id: id, userId }).exec();
    if (!deck) {
      throw new NotFoundException(ERROR_MESSAGES.DECK_NOT_FOUND.message);
    }
    return {
      id: id,
      name: deck.name,
      color: deck.color,
      cards_count: deck.cards_id?.length || 0,
    };
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.ownershipService.verifyDeckOwnership(id, userId);
    const result = await this.deckModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Deck not found');
    }
    await this.usersService.removeDeckFromUser(userId, id);
  }

  async update(
    id: string,
    updateDeckDto: UpdateDeckDto,
    userId: string,
  ): Promise<ReadDeckDto> {
    await this.ownershipService.verifyDeckOwnership(id, userId);
    const updatedDeck = await this.deckModel.findByIdAndUpdate(
      id,
      updateDeckDto,
      { new: true },
    );
    return {
      id: updatedDeck._id.toString(),
      name: updatedDeck.name,
      color: updatedDeck.color,
      cards_count: updatedDeck.cards_id?.length || 0,
    };
  }

  async addCardToDeck(deckId: string, cardId: string): Promise<void> {
    await this.deckModel.updateOne(
      { _id: deckId },
      { $push: { cards_id: cardId } },
    );
  }

  async removeCardFromDeck(deckId: string, cardId: string): Promise<void> {
    const deck = await this.deckModel.findById(deckId);
    if (!deck) {
      throw new NotFoundException(ERROR_MESSAGES.DECK_NOT_FOUND.message);
    }

    deck.cards_id = deck.cards_id.filter(id => id !== cardId);
    await deck.save();
  }
}
