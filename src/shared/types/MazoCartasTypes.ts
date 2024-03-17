import { Card, CardType } from "./CardTypes";

export interface MazoCartasProps {
  cards: Card[];
  onSelectQuestion: (questionId: number) => void;
}
export type MazoCartasType = {
  cards: CardType[];
  onSelectQuestion: (questionId: number) => void;
};
