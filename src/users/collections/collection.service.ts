import { Injectable } from '@nestjs/common';
import { Collection } from './models/collection.model';
import { CreateCollectionDto } from './dto/create-collection.dto/create-collection.dto';
import { createSHA256Hash } from 'src/helpers/hash.helper';
import { Card } from '../cards/models/cards.model';

@Injectable()
export class CollectionsService {
  private readonly collections: Collection[] = [];

  create(createCollectionDto: CreateCollectionDto): Collection {
    const newCollection: Collection = new Collection({
      id: this.generateId(),
      name: createCollectionDto.name,
      cards: createCollectionDto.cards
        ? createCollectionDto.cards.map((cardDto) =>
            this.convertToCard(cardDto),
          )
        : [],
    });
    this.collections.push(newCollection);
    return newCollection;
  }

  private generateId(): string {
    return createSHA256Hash(Date.now().toString());
  }

  private convertToCard(cardDto: any): Card {
    return {
      id: cardDto.id,
      question: cardDto.question,
      answers: cardDto.answers,
      correctAnswer: cardDto.correctAnswer,
    };
  }
}
