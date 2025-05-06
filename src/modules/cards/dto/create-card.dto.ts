import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ERROR_MESSAGES } from '@errors/error-messages';

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

  @ApiProperty({
    description: 'Game options',
    example: {
      addIncorrect: false,
      answerFourOptions: false,
      askFront: true,
      askSide: false,
      beHonest: true,
      dailyTest: true,
      guessAnswer: true,
      riddle: true,
      trueFalse: true,
    },
  })
  @IsNotEmpty({ message: 'Game options are required' })
  @IsObject({ message: 'Game options must be an object' })
  gameOptions: Record<string, any>;

  @ApiProperty({ description: 'Last review timestamp', example: 1744997138 })
  @IsNotEmpty()
  lastReview: number;

  @ApiProperty({ description: 'Next review timestamp', example: 1799007138 })
  @IsNotEmpty()
  nextReview: number;
}
