import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ❌ Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // 🚫 Lanza error si hay propiedades no permitidas
      transform: true, // 🔄 Convierte datos a los tipos especificados en el DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
