import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck, DeckDocument } from '../modules/decks/entities/deck.entity';
import { UsersService } from './users.service';
import { CreateDeckDto } from '../modules/decks/dto/create-deck.dto';
import { UpdateDeckDto } from '../modules/decks/dto/update-deck.dto';
import { ERROR_MESSAGES } from '../errors/error-messages';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel(Deck.name) private readonly deckModel: Model<DeckDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(createDeckDto: CreateDeckDto, userId: string): Promise<Deck> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newDeck = new this.deckModel({
      ...createDeckDto,
      userId,
    });
    const deck = await newDeck.save();

    await this.usersService.addDeckToUser(userId, deck._id.toString());

    return deck;
  }

  async findByUserId(userId: string): Promise<Deck[]> {
    return this.deckModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Deck> {
    const deck = await this.findDeckById(id);
    this.checkDeckOwnership(deck, userId);
    return deck;
  }

  async remove(id: string, userId: string): Promise<void> {
    const deck = await this.findDeckById(id);
    this.checkDeckOwnership(deck, userId);
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
  ): Promise<Deck> {
    const deck = await this.findDeckById(id);
    this.checkDeckOwnership(deck, userId);
    return this.deckModel.findByIdAndUpdate(id, updateDeckDto, { new: true });
  }

  private async findDeckById(id: string): Promise<Deck> {
    const deck = await this.deckModel.findById(id);
    if (!deck) {
      throw new NotFoundException(ERROR_MESSAGES.DECK_NOT_FOUND.message);
    }
    return deck;
  }

  private checkDeckOwnership(deck: Deck, userId: string): void {
    if (deck.userId !== userId) {
      throw new BadRequestException(
        ERROR_MESSAGES.UNAUTHORIZED_DECK_ACCESS.message,
      );
    }
  }

  async verifyDeckOwnership(deckId: string, userId: string): Promise<void> {
    const deck = await this.findOne(deckId, userId);
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
  }

  async addCardToDeck(deckId: string, cardId: string): Promise<void> {
    console.log(cardId);
    await this.deckModel.updateOne(
      { _id: deckId },
      { $push: { cards_id: cardId } },
    );
  }

  async removeCardFromDeck(deckId: string, cardId: string): Promise<void> {
    await this.deckModel.updateOne(
      { _id: deckId },
      { $pull: { cards_id: cardId } },
    );
  }
}
