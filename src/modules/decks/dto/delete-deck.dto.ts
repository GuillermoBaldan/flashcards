import { ApiProperty } from '@nestjs/swagger';

export class DeleteDeckDto {
  @ApiProperty({
    description: 'ID del mazo a eliminar',
    example: '609b5b65b20e14655c949a8e',
  })
  id: string;
}
