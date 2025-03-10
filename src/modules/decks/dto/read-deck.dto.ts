import { ApiProperty } from '@nestjs/swagger';

export class ReadDeckDto {
  @ApiProperty({
    description: 'ID of the deck',
    example: '609b5b65b20e14655c949a8e',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the deck',
    example: 'Math Deck',
  })
  title: string;

  @ApiProperty({
    description: 'User ID who owns the deck',
    example: '6609bb251e4a90522ebe6ed2',
  })
  userId: string;

  @ApiProperty({
    description: 'List of card IDs in the deck',
    type: [String],
    example: ['6609bb441e4a90522ebe6ed9'],
  })
  cards: string[];
}
