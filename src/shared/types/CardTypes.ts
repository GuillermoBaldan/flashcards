import { Question, QuestionType } from "./QuestionsTypes";

export interface CardProps {
  children: string;
  isSelected: boolean;
}

export type CardPropsType = {
  children: string;
  isSelected: boolean;
};

export interface Card extends Question {
  isSelected: boolean;
}

export type CardType = QuestionType & {
  isSelected: boolean;
};
