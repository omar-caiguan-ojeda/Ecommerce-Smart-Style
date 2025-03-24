// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as session from 'express-session';
// import { config } from 'dotenv';

// config(); // Carga las variables de entorno desde .env

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Habilitar sesiones para Auth0
//   app.use(
//     session({
//       secret: process.env.SESSION_SECRET || 'una_clave_secreta_random', // Usa SESSION_SECRET del .env
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         secure: process.env.NODE_ENV === 'production', // Solo cookies seguras en producción (HTTPS)
//         maxAge: 24 * 60 * 60 * 1000, // 24 horas de duración
//       },
//     }),
//   );

//   // Habilitar CORS de forma segura
//   app.enableCors({
//     origin: (origin, callback) => {
//       const allowedOrigins = process.env.ALLOWED_ORIGINS
//         ? process.env.ALLOWED_ORIGINS.split(',')
//         : ['http://localhost:4200', 'http://localhost:3000'];
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Necesario para enviar cookies con las sesiones
//   });

//   // Habilitar validaciones globales
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//       transformOptions: { enableImplicitConversion: true },
//     }),
//   );

//   // Configuración de Swagger
//   const swaggerConfig = new DocumentBuilder()
//     .setTitle('Ecommerce API')
//     .setDescription('API documentation for the ecommerce platform')
//     .setVersion('1.0')
//     .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
//     .build();

//   const document = SwaggerModule.createDocument(app, swaggerConfig);
//   SwaggerModule.setup('api/docs', app, document);

//   // Arrancar servidor
//   const port = process.env.PORT || 3000;
//   await app.listen(port);
//   console.log(`🚀 Server running on http://localhost:${port}`);
// }

// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

config(); // Carga las variables de entorno desde .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS de forma segura
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : ['http://localhost:4200', 'http://localhost:3000'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Todavía útil para cookies si usas otras autenticaciones
  });

  // Habilitar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('API documentation for the ecommerce platform')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Arrancar servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();