import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DisplayExceptionFilter } from './filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.setGlobalPrefix('ts_im_api');
  app.useGlobalFilters(new DisplayExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('ts_im api')
    .setDescription('The ts_im API description')
    .setVersion('1.0')
    .addTag('ts_im_api')
    .setBasePath('/ts_im_api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/ts_im_api_swagger', app, document);
  await app.listen(3000);
}
bootstrap();
