import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'The question of the card',
    example: 'What is 2+2?',
  })
  @IsNotEmpty({ message: 'Question cannot be empty' })
  @IsString({ message: 'Question must be a string' })
  question: string;

  @ApiProperty({ description: 'The answer of the card', example: '4' })
  @IsNotEmpty({ message: 'Answer cannot be empty' })
  @IsString({ message: 'Answer must be a string' })
  answer: string;

  @ApiProperty({ description: 'The AT of the card', example: 3 })
  @IsNotEmpty({ message: 'AT cannot be empty' })
  AT: number;

  @ApiProperty({
    description: 'The last time of the card',
    example: '2024-03-24T12:00:00.000Z',
  })
  @IsNotEmpty({ message: 'Last time cannot be empty' })
  lastTime: Date;

  @ApiProperty({
    description: 'The next time of the card',
    example: '2024-03-24T12:00:00.000Z',
  })
  @IsNotEmpty({ message: 'Next time cannot be empty' })
  nextTime: Date;

  @ApiProperty({
    description: 'The ID of the deck',
    example: '609b5b65b20e14655c949a8e',
  })
  @IsNotEmpty({ message: 'Deck ID cannot be empty' })
  deckId: string;
}
