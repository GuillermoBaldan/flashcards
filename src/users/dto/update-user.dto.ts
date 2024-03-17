import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The username of the user (optional)',
    example: 'new_john_doe',
  })
  username?: string;

  @ApiProperty({
    description: 'The password of the user (optional)',
    example: 'new_password123',
  })
  password?: string;
}
