import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { StatusType } from '@constants/constants';

export class ProcessDeckShareResponseDto {
  @ApiProperty({
    description: 'Respuesta a la solicitud',
    enum: ['accepted', 'rejected'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['accepted', 'rejected'])
  response: StatusType;
}
