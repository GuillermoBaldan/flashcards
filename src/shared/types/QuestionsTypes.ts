export interface Question {
  id: number;
  question: string;
  answers?: { [key: string]: string };
  correctAnswer?: string;
}

export type QuestionType = {
  id: number;
  question: string;
  answers?: { [key: string]: string };
  correctAnswer?: string;
};
