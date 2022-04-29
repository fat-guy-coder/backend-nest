/* cats.controller.ts */

import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Header,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }

  @ApiQuery({ name: 'limit', required: false })
  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get('small') //使用转数字pipe
  findOne(@Query('id', new ParseIntPipe()) id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @Header('Cache-Control', 'none') // 设置响应头
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
