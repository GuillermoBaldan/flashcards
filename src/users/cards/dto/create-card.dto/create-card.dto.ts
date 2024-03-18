import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  readonly question: string;

  @ApiProperty()
  readonly answers: Record<string, string>;

  @ApiProperty()
  readonly correctAnswer: string;
}
