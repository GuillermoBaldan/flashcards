import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty()
  @IsString()
  cardId: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
} 