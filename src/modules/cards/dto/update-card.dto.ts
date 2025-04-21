import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    description: 'The front of the card',
    example: '<p>Question</p>',
  })
  @IsOptional()
  @IsString()
  front?: string;

  @ApiProperty({
    description: 'The back of the card',
    example: '<p>Answer</p>',
  })
  @IsOptional()
  @IsString()
  back?: string;

  @ApiProperty({
    description: 'The deck ID',
    example: '67d69a7ab8a6a6f8c1ee4a35',
  })
  @IsOptional()
  @IsString()
  deckId?: string;

  @ApiProperty({ description: 'The type of card', example: 'classic' })
  @IsOptional()
  @IsString()
  cardType?: string;

  @ApiProperty({ description: 'Game options', type: Object })
  @IsOptional()
  gameOptions?: {
    addIncorrect?: boolean;
    answerFourOptions?: boolean;
    askFront?: boolean;
    askSide?: boolean;
    beHonest?: boolean;
    dailyTest?: boolean;
    guessAnswer?: boolean;
    riddle?: boolean;
    trueFalse?: boolean;
    incorrectAnswers?: string[];
  };

  @ApiProperty({ description: 'Next review timestamp', example: 1799007138 })
  @IsOptional()
  nextReview?: number;

  @ApiProperty({ description: 'Last review timestamp', example: 1744997138 })
  @IsOptional()
  lastReview?: number;
}
