import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
import { CatsController } from './cats/cats.controller';
import { DogsService } from './dogs/dogs.service';
import { HumanService } from './human/human.service';
import { HumanController } from './human/human.controller';
import { HumanModule } from './human/human.module';
import { DynamicTypeModule } from './dynamic/dynamic.module';
import { MiddlewareService } from './middleware/middleware.service';

//值的provider 用于替代provider
// const mockHumanService = {
//   /* mock implementation
//   ...
//   */
//   humans: [],
//   create(human) {
//     this.humans.push(human);
//   },
//   findAll() {
//     return this.humans;
//   },
// };

//useFactory   工厂函数将传入的privider作为参数,处理后返回一个新的provider
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: HumanService) => {
    console.log(optionsProvider);
    return new DogsService();
  },
  inject: [HumanService],
};

@Module({
  imports: [HumanModule, DynamicTypeModule.forRoot([{ name: 'dnamicModule' }])], //引入模块
  controllers: [AppController, DogsController, CatsController, HumanController],
  providers: [
    AppService,
    DogsService,
    HumanService,
    //值的provider
    // {
    //   provide: HumanService,
    //   useValue: mockHumanService,
    // },
    //useFactory
    connectionFactory,
    {
      provide: 'HUMAN',
      useValue: HumanService,
    },
    MiddlewareService,
  ],
})
export class AppModule implements NestModule {
  //给module添加provider
  constructor(private readonly catsService: HumanService) {}
  //使用中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareService).forRoutes('cats');
  }
}
