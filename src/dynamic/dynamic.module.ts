import { Module, DynamicModule } from '@nestjs/common';
import { HumanService } from '../human/human.service';

@Module({
  providers: [HumanService],
})
export class DynamicTypeModule {
  static forRoot(entities = [], options?): DynamicModule {
    console.log(entities, options);
    //const providers = createDatabaseProviders(options, entities);
    return {
      module: DynamicTypeModule,
      providers: [HumanService],
      exports: [HumanService],
    };
  }
}
