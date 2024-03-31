import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class DeleteCardDto {
  @ApiProperty({
    description: 'The ID of the card to delete',
    example: '609b5b65b20e14655c949a8e',
  })
  @IsNotEmpty({ message: 'Card ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Card ID' })
  id: string;
}
