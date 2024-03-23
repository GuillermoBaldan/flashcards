import { Card } from '../../cards/models/cards.model';

export class Collection {
  id: string;
  name: string;
  cards: Card[];

  constructor(collection: Partial<Collection>) {
    Object.assign(this, collection);
  }
}
