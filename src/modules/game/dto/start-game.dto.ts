import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsString, ValidateIf } from 'class-validator';
import { ALLOWED_GAME_MODES, DIFFICULTY_LEVELS, ALLOWED_CARD_COUNTS } from 'src/constants/constants';

export class StartGameDto {
  @ApiProperty({ enum: ALLOWED_GAME_MODES })
  @IsIn(ALLOWED_GAME_MODES)
  gameMode: string;

  @ApiProperty({ enum: DIFFICULTY_LEVELS })
  @IsIn(DIFFICULTY_LEVELS)
  difficulty: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  deckIds: string[];

  @ApiProperty({ enum: ALLOWED_CARD_COUNTS })
  @ValidateIf(o => o.difficulty !== 'calibrate')
  @IsIn(ALLOWED_CARD_COUNTS)
  cardCount: number;
} 