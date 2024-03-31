import { ApiProperty } from '@nestjs/swagger';

export class ReadUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com',
  })
  email: string;
}
