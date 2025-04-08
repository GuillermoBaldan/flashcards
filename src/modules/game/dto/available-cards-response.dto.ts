import { ApiProperty } from '@nestjs/swagger';

export class AvailableCardsResponseDto {
  @ApiProperty()
  '10': boolean;

  @ApiProperty()
  '15': boolean;

  @ApiProperty()
  '20': boolean;
} 