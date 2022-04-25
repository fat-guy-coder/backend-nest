import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
import { CatsController } from './cats/cats.controller';
import { DogsService } from './dogs/dogs.service';
import { HumanService } from './human/human.service';
import { HumanController } from './human/human.controller';
import { HumanModule } from './human/human.module';

//值的provider 用于替代provider
const mockHumanService = {
  /* mock implementation
  ...
  */
  humans: [],
  create(human) {
    this.humans.push(human);
  },
  findAll() {
    return this.humans;
  },
};

//useFactory   工厂函数将传入的privider作为参数,处理后返回一个新的provider
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: HumanService) => {
    const options = optionsProvider.get();
    return new DogsService(options);
  },
  inject: [HumanService],
};

@Module({
  imports: [HumanModule], //引入模块
  controllers: [AppController, DogsController, CatsController, HumanController],
  providers: [
    AppService,
    DogsService,
    HumanService,
    //值的provider
    {
      provide: HumanService,
      useValue: mockHumanService,
    },
    //useFactory
    connectionFactory,
    {
      provide: 'HUMAN',
      useValue: HumanService,
    },
  ],
})
export class AppModule {
  //给module添加provider
  constructor(private readonly catsService: HumanService) {}
}
