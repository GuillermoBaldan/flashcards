import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class StartGameDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  deckIds: string[];
}
