import { Module } from '@nestjs/common';
import { HumanService } from './human.service';
import { HumanController } from './human.controller';
@Module({
  controllers: [HumanController],
  providers: [HumanService],
})
export class HumanModule {}
