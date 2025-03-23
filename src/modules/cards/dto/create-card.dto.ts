import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ERROR_MESSAGES } from 'src/errors/error-messages';

export class CreateCardDto {
  @ApiProperty({
    description: 'The front of the card',
    example: '<p>Question</p>',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.CARD_FRONT_EMPTY.message })
  @IsString({ message: ERROR_MESSAGES.CARD_FRONT_INVALID.message })
  front: string;

  @ApiProperty({
    description: 'The back of the card',
    example: '<p>Answer</p>',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.CARD_BACK_EMPTY.message })
  @IsString({ message: ERROR_MESSAGES.CARD_BACK_INVALID.message })
  back: string;

  @ApiProperty({
    description: 'The deck ID',
    example: '67d69a7ab8a6a6f8c1ee4a35',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.CARD_DECK_ID_EMPTY.message })
  @IsString({ message: ERROR_MESSAGES.CARD_DECK_ID_EMPTY.message })
  deckId: string;

  @ApiProperty({ description: 'The type of card', example: 'classic' })
  @IsNotEmpty({ message: ERROR_MESSAGES.CARD_TYPE_EMPTY.message })
  @IsString({ message: ERROR_MESSAGES.CARD_TYPE_EMPTY.message })
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
