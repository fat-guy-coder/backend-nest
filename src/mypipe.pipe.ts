import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable() //PipeTransform<T, R> 是一个通用接口，其中 T 表示 value 的类型，R 表示 transform() 方法的返回类型
export class PipeService implements PipeTransform<string, string> {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata);
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
