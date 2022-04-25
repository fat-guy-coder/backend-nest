export interface CreateCatDto {
  name: string;
  age: number;
}

export interface UpdateCatDto {
  name: string;
  age: number;
}

export interface ListAllEntities {
  limit: number;
}
