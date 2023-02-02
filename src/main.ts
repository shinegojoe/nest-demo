import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
require('dotenv').config();


// import { userSource } from './index';

async function bootstrap() {
  // userSource();
  const app = await NestFactory.create(AppModule, {
    // logger: false
  });

  const config = new DocumentBuilder()
    .setTitle('XXX example')
    .setDescription('The XXX API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  // console.log("xx: ", process.env.qq);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),)
  await app.listen(3000);
}
bootstrap();
