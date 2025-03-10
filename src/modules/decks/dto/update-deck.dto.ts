import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeckDto {
  @ApiProperty({
    description: 'ID del mazo a actualizar',
    example: '609b5b65b20e14655c949a8e',
  })
  id: string;

  @ApiProperty({
    description: 'Nuevo título del mazo',
    example: 'Updated Math Deck',
  })
  title: string;
}
