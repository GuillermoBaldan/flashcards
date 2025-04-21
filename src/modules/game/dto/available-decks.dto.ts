import { ApiProperty } from '@nestjs/swagger';

export class AvailableDeckDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  available: boolean;

  @ApiProperty({ required: false })
  firstCardNextReview?: number;

  @ApiProperty({ required: false })
  reason?: string;
}

export class AvailableDecksResponseDto {
  @ApiProperty({ type: [AvailableDeckDto] })
  decks: AvailableDeckDto[];
} 