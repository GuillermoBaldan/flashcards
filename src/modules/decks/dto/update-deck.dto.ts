import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateDeckDto {
  @ApiProperty({
    description: 'ID del mazo a actualizar',
    example: '609b5b65b20e14655c949a8e',
  })
  id: string;

  @ApiProperty({
    description: 'Nuevo nombre del mazo',
    example: 'Updated Math Deck',
  })
  name?: string;

  @ApiProperty({
    description: 'Nuevo color del mazo',
    example: '#00FF00',
  })
  color?: string;

  @ApiProperty({ 
    description: 'Timestamp de la próxima revisión de la primera tarjeta',
    example: 1799007138,
    required: false
  })
  @IsOptional()
  firstCardNextReview?: number;
}
