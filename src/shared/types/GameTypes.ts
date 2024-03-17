import { Question } from "./QuestionsTypes";

export interface GameProps {
  question: Question | null;
}

export type GameType = {
  question: Question | null;
};
