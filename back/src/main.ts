import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CreateUserDto } from './modules/users/dto/create-user.dto';

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

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('API documentation for the ecommerce platform')
    .setVersion('1.0')
    .addBearerAuth() // Para manejar autenticación con tokens
    .build();

  const document = SwaggerModule.createDocument(app, config, 
    //{ extraModels: [CreateUserDto], }
  );

  // 👇 Agrega los modelos manualmente
  //document.components = document.components || {};
  //document.components.schemas = document.components.schemas || {};
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
