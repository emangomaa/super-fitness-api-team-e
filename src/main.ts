import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('super-fitness-api')
    .setDescription('API documentation for Super Fitness system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // يشيل أي field مش موجود في DTO
      forbidNonWhitelisted: true, // يرمي error لو فيه field زيادة
      transform: true, // يفعل class-transformer
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
