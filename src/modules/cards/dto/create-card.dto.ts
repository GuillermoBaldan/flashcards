import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'The front of the card',
    example: '<p>Question</p>',
  })
  @IsNotEmpty()
  @IsString()
  front: string;

  @ApiProperty({
    description: 'The back of the card',
    example: '<p>Answer</p>',
  })
  @IsNotEmpty()
  @IsString()
  back: string;

  @ApiProperty({
    description: 'The deck ID',
    example: '67d69a7ab8a6a6f8c1ee4a35',
  })
  @IsNotEmpty()
  @IsString()
  deckId: string;

  @ApiProperty({ description: 'The type of card', example: 'classic' })
  @IsNotEmpty()
  @IsString()
  cardType: string;

  @ApiProperty({ description: 'Game options', type: Object })
  gameOptions: {
    addIncorrect: boolean;
    answerFourOptions: boolean;
    askFront: boolean;
    askSide: boolean;
    beHonest: boolean;
    dailyTest: boolean;
    guessAnswer: boolean;
    riddle: boolean;
    trueFalse: boolean;
    incorrectAnswers?: string[];
  };
}
