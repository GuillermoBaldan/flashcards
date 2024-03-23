export class Card {
  id: string;
  question: string;
  answers: Record<string, string>;
  correctAnswer: string;

  constructor(card: Partial<Card>) {
    Object.assign(this, card);
  }
}
