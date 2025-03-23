import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ERROR_MESSAGES } from 'src/errors/error-messages';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT.message })
  @IsEmail({}, { message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT.message })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.PASSWORD_EMPTY.message })
  password: string;
}
