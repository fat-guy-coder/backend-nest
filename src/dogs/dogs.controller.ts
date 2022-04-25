import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  HostParam,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto'; //建立专门的DTO类型文件

//@Controller('d*f') 路由通配符

//@Controller({ host: 'admin.example.com' })域名

//@Controller({ host: ':account.example.com' })域名参数

@Controller('dogs:id') // 定义路由
export class DogsController {
  @Get() // 定义路由 RESFUL风格 如果是get请求，则返回一个字符串  如果传参数则拼接cats  请求生成路由映射  @Get('cats') 则为 GET /dogs/cats
  findAll(): string {
    // 定义方法
    return 'This action returns all dogs';
  }

  @Get('cats') // 定义路由 @Get('cats') 则为 GET /dogs/cats
  findAllCats(): string {
    // 定义方法
    return 'This action returns all cats';
  }

  //@HttpCode(204) 设置响应码

  //@Req()请求装饰器
  //@Redirect('https://nestjs.com', 301) 重定向
  findAllLittleGog(@Req() request: Request, @Param() param): string {
    //param.id
    console.log(request.hostname, param);
    return 'This action returns all cats';
    // return  {  通过这种方式返回对象, 可以设置响应码, 也可以设置重定向,并且会覆盖Redirect('https://nestjs.com', 301)
    //   "url": string,
    //   "statusCode": number
    // }
  }

  findById(@Param('id') id): string {
    //id  如果参数装饰器中传了参数字段,即可直接获取参数
    console.log(id);
    return 'This action returns all cats';
  }

  getHostParam(@HostParam('account') account): string {
    //account  获取域名参数
    return account;
  }

  //async await 异步方法
  @Get()
  async findByGet(): Promise<any[]> {
    return [];
  }
  //另一种异步方法
  // findByGet(): Observable<any[]> {
  //   return of([]);
  // }

  //DTO 类型限制
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }

  @Get('small:id')
  async findOne(
    @Param('id') id: string, //传递({ passthrough: true }) //参数透传
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(HttpStatus);
    res.status(HttpStatus.OK).json([{ id }]);
  }
}
