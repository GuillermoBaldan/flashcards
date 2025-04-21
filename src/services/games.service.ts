import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from 'src/modules/cards/entities/cards.entity';
import { DecksService } from 'src/services/decks.service';
import { CardResultDto } from 'src/modules/game/dto/update-card-results.dto';
import { Deck, DeckDocument } from 'src/modules/decks/entities/deck.entity';
import { AvailableDecksResponseDto } from 'src/modules/game/dto/available-decks.dto';
import { OwnershipService } from 'src/services/ownership.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectModel(Deck.name) private readonly deckModel: Model<DeckDocument>,
    private readonly decksService: DecksService,
    private readonly ownershipService: OwnershipService
  ) {}

  async startGame(deckIds: string[], userId: string) {
    for (const deckId of deckIds) {
      await this.ownershipService.verifyDeckOwnership(deckId, userId);
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const cards = await this.cardModel.find({
      deckId: { $in: deckIds },
      nextReview: { $lte: currentTimestamp }
    })
    .sort({ nextReview: 1 })
    .exec();

    if (cards.length === 0) {
      throw new BadRequestException('No hay cartas disponibles para jugar');
    }

    return cards.map(card => ({
      id: card._id.toString(),
      front: card.front,
      back: card.back,
      deckId: card.deckId,
      lastReview: card.lastReview,
      nextReview: card.nextReview,
      gameOptions: card.gameOptions
    }));
  }

  async updateCardResults(cardResults: CardResultDto[], userId: string) {
    const deckIds = new Set<string>();
    
    for (const result of cardResults) {
      const card = await this.cardModel.findById(result.cardId).exec();
      if (!card) {
        throw new NotFoundException('Carta no encontrada');
      }
      
      await this.ownershipService.verifyDeckOwnership(card.deckId.toString(), userId);
      deckIds.add(card.deckId);

      await this.cardModel.updateOne(
        { _id: result.cardId },
        { 
          lastReview: result.lastReview,
          nextReview: result.nextReview 
        }
      );
    }

    for (const deckId of deckIds) {
      const nextCard = await this.cardModel.findOne({ deckId })
        .sort({ nextReview: 1 })
        .exec();

      if (nextCard) {
        await this.deckModel.updateOne(
          { _id: deckId },
          { $set: { firstCardNextReview: nextCard.nextReview } }
        );
      }
    }

    return { success: true };
  }

  async getAvailableDecks(userId: string): Promise<AvailableDecksResponseDto> {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const decks = await this.deckModel.find({ userId }).exec();
    
    const availableDecks = decks.map(deck => {
      const isAvailable = deck.firstCardNextReview  
        ? deck.firstCardNextReview <= currentTimestamp 
        : false;
      
      const response = {
        id: deck._id.toString(),
        name: deck.name,
        color: deck.color,
        available: isAvailable,
        firstCardNextReview: deck.firstCardNextReview
      };

      if (!isAvailable) {
        response['reason'] = deck.cards_id?.length === 0 
          ? 'El mazo no tiene cartas' 
          : 'No hay cartas disponibles para jugar aún';
      }

      return response;
    });

    return { decks: availableDecks }; 
  }
}