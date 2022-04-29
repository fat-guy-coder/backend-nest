import { ApiProperty } from '@nestjs/swagger';
export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}

export interface UpdateCatDto {
  name: string;
  age: number;
}

export interface ListAllEntities {
  limit: number;
}
