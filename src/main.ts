import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { userSource } from './index';

async function bootstrap() {
  // userSource();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
