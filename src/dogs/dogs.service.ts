import { Injectable } from '@nestjs/common';
import { Dog } from './dogs.interface';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  options: any;

  constructor(options) {
    this.options = options;
  }

  create(dog: Dog) {
    this.dogs.push(dog);
  }

  findAll(): Dog[] {
    return this.dogs;
  }
}
