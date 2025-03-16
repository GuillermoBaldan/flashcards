import { ApiProperty } from '@nestjs/swagger';

export class ReadCardDto {
  @ApiProperty({
    description: 'ID of the card',
    example: '609b5b65b20e14655c949a8e',
  })
  id: string;

  @ApiProperty({
    description: 'Front content of the card',
  })
  front: string;

  @ApiProperty({
    description: 'Back content of the card',
  })
  back: string;

  @ApiProperty({
    description: 'Deck ID of the card',
    example: '609b5b65b20e14655c949a8e',
  })
  deckId: string;

  @ApiProperty({
    description: 'Type of card',
  })
  cardType: string;

  @ApiProperty({
    description: 'Game options',
  })
  gameOptions: object;

  @ApiProperty({
    description: 'Attempts count',
    example: 0,
  })
  AT: number;

  @ApiProperty({
    description: 'Last review time',
  })
  lastTime: Date;

  @ApiProperty({
    description: 'Next review time',
  })
  nextTime: Date;
}
