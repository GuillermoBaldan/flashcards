import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly cards: Record<string, any>[];
}
