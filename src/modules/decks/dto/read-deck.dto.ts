import { ApiProperty } from '@nestjs/swagger';

export class ReadDeckDto {
  @ApiProperty({
    description: 'ID of the deck',
    example: '609b5b65b20e14655c949a8e',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the deck',
    example: 'Math Deck',
  })
  name: string;

  @ApiProperty({
    description: 'Color of the deck',
    example: '#FF0000',
  })
  color: string;

  @ApiProperty({
    description: 'Number of cards in the deck',
    example: 5,
  })
  cards_count: number;
}
