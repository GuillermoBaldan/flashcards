import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ERROR_MESSAGES } from '@errors/error-messages';

export class UpdateDeckDto {
  @ApiProperty({
    description: 'ID del mazo a actualizar',
    example: '609b5b65b20e14655c949a8e',
  })
  @IsOptional()
  @IsString({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message })
  id?: string;

  @ApiProperty({
    description: 'Nuevo nombre del mazo',
    example: 'Updated Math Deck',
  })
  @IsOptional()
  @IsString({ message: ERROR_MESSAGES.DECK_NAME_INVALID.message })
  name?: string;

  @ApiProperty({
    description: 'Nuevo color del mazo',
    example: '#00FF00',
  })
  @IsOptional()
  @IsString({ message: ERROR_MESSAGES.DECK_COLOR_INVALID.message })
  color?: string;

  @ApiProperty({
    description: 'Timestamp de la próxima revisión de la primera tarjeta',
    example: 1799007138,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  firstCardNextReview?: number;
}
