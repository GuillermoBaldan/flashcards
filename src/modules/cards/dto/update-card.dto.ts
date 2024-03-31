import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    description: 'The question of the card',
    example: 'What is 2+2?',
  })
  @IsString({ message: 'Question must be a string' })
  question?: string;

  @ApiProperty({ description: 'The answer of the card', example: '4' })
  @IsString({ message: 'Answer must be a string' })
  answer?: string;

  @ApiProperty({ description: 'The AT of the card', example: 3 })
  @IsNumber({}, { message: 'AT must be a number' })
  AT?: number;

  @ApiProperty({
    description: 'The last time of the card',
    example: '2024-03-24T12:00:00.000Z',
  })
  lastTime?: Date;

  @ApiProperty({
    description: 'The next time of the card',
    example: '2024-03-24T12:00:00.000Z',
  })
  nextTime?: Date;

  @ApiProperty({
    description: 'The ID of the deck',
    example: '609b5b65b20e14655c949a8e',
  })
  deckId?: string;
}
