import { ApiProperty } from '@nestjs/swagger';

export class UserSearchDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
