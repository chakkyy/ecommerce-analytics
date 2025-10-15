import * as express from 'express';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  const config = new DocumentBuilder()
    .setTitle('ecommerce-analytics  ecommerce API')
    .setDescription('ecommerce-analytics  ecommerce API endpoints documentation')
    .setVersion('1.0')
    .addTag('ecommerce-analytics  ecommerce API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/api-docs', app, document);
  await app.listen(4000);
}
bootstrap();
