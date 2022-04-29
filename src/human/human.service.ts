import { Injectable, Inject, Optional } from '@nestjs/common';
import { Human } from './human.interface';

@Injectable()
export class HumanService {
  private readonly humans: Human[] = [];

  //您的类可能依赖于一个配置对象，但如果没有传递，则应使用默认值
  // @Optional() 如果没有传递参数,则使用默认值
  constructor(@Optional() @Inject('HUMAN') private httpClient) {}

  create(human: Human) {
    this.humans.push(human);
  }

  add(human: Human) {
    this.humans.push(human);
  }

  findAll(): Human[] {
    return this.humans;
  }

  getSome(): any {
    return { name: 'getSome' };
  }
}
