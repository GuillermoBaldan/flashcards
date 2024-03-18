import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto/create-card.dto';
import { Card } from './models/cards.model';
import { createSHA256Hash } from '../../helpers/hash.helper';

@Injectable()
export class CardsService {
  private readonly cards: Card[] = [];

  create(createCardDto: CreateCardDto): Card {
    const newCard: Card = new Card({
      id: this.generateId(),
      ...createCardDto,
    });
    this.cards.push(newCard);
    return newCard;
  }

  private generateId(): string {
    return createSHA256Hash(new Date().toISOString());
  }
}
