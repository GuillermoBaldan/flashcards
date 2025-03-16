import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeckDto {
  @ApiProperty({
    description: 'Name of the deck',
    example: 'Math Deck',
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Color of the deck',
    example: '#FF0000',
  })
  @IsNotEmpty({ message: 'Color cannot be empty' })
  @IsString({ message: 'Color must be a string' })
  color: string;
}
