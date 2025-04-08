import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsIn } from 'class-validator';
import { ALLOWED_GAME_MODES } from 'src/constants/constants';

export class CalculateCardsDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  deckIds: string[];

  @ApiProperty({ enum: ALLOWED_GAME_MODES })
  @IsIn(ALLOWED_GAME_MODES)
  gameMode: string;
}
