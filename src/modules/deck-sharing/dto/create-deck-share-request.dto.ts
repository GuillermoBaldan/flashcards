import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeckShareRequestDto {
  @ApiProperty({ description: 'ID del usuario receptor' })
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({ description: 'ID del mazo a compartir' })
  @IsString()
  @IsNotEmpty()
  deckId: string;
}
