import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { ERROR_MESSAGES } from 'src/errors/error-messages';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsNotEmpty({ message: ERROR_MESSAGES.USERNAME_EMPTY.message })
  @IsString({ message: ERROR_MESSAGES.USERNAME_INVALID.message })
  @MinLength(4, { message: ERROR_MESSAGES.USERNAME_TOO_SHORT.message })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: ERROR_MESSAGES.USERNAME_INVALID_CHARS.message,
  })
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT.message })
  @IsEmail({}, { message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT.message })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: ERROR_MESSAGES.PASSWORD_EMPTY.message })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: ERROR_MESSAGES.PASSWORD_WEAK.message,
    },
  )
  password: string;
}
