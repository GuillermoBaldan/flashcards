import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ERROR_MESSAGES } from 'src/errors/error-messages';

export class CreateDeckDto {
  @ApiProperty({
    description: 'Name of the deck',
    example: 'Math Deck',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.DECK_NAME_EMPTY.message })
  @IsString({ message: ERROR_MESSAGES.DECK_NAME_INVALID.message })
  name: string;

  @ApiProperty({
    description: 'Color of the deck',
    example: '#FF0000',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.DECK_COLOR_EMPTY.message })
  @IsString({ message: ERROR_MESSAGES.DECK_COLOR_INVALID.message })
  color: string;
}
