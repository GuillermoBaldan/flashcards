import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsString, ValidateIf } from 'class-validator';
import { ALLOWED_GAME_MODES, DIFFICULTY_LEVELS, ALLOWED_CARD_COUNTS } from 'src/constants/constants';

export class StartGameDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  deckIds: string[];
} 