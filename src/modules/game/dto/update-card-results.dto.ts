import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CardResultDto {
  @ApiProperty()
  @IsString()
  cardId: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}

export class UpdateCardResultsDto {
  @ApiProperty({ type: [CardResultDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardResultDto)
  cardResults: CardResultDto[];
} 