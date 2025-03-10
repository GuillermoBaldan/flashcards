import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({
    description: 'El ID del usuario a eliminar',
    example: '6123456789abcdef01234567',
  })
  id: string;
}
