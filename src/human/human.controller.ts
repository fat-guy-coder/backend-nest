import { Controller, Post, Body, Get } from '@nestjs/common';
import { HumanService } from './human.service';
import { Human } from './human.interface';

@Controller('human')
export class HumanController {
  // 使用服务类 将服务类注入到控制器中
  constructor(private catsService: HumanService) {}

  @Post()
  async create(@Body() createCatDto: Human) {
    this.catsService.create(createCatDto);
  }

  @Get('add')
  async add(): Promise<any> {
    this.catsService.add({ name: 'add', age: 1, gender: 'man' });
    return { code: 0, message: 'sucess' };
  }

  @Get()
  async findAll(): Promise<Human[]> {
    return this.catsService.findAll();
  }
}
