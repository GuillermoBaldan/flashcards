import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'El nuevo nombre de usuario del usuario (opcional)',
    example: 'nuevo_john_doe',
  })
  username?: string;

  @ApiProperty({
    description: 'La nueva contraseña del usuario (opcional)',
    example: 'nueva_contraseña123',
  })
  password?: string;

  @ApiProperty({
    description: 'El nuevo correo electrónico del usuario (opcional)',
    example: 'nuevo_correo@example.com',
  })
  email?: string;
}
