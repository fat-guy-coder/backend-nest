import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//@nestjs/platform-express express的nest库

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
