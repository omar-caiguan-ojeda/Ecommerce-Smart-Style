// // auth.module.ts
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { JwtStrategy } from './strategy/jwt.strategy';
// import { PassportModule } from '@nestjs/passport';
// import { FacebookStrategy } from './strategy/facebook.strategy';
// import { GoogleStrategy } from './strategy/google.strategy';
// import { Auth0Strategy } from './strategy/auth0.strategy';
// import { SessionSerializer } from './session.serializer';

// @Module({
//   imports: [
//     // Configurar Passport con soporte para sesiones (necesario para Auth0)
//     PassportModule.register({ session: true, defaultStrategy: 'jwt' }),
//     // Configurar JwtModule con JWT_SECRET (para tus tokens JWT)
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'your-secret-key',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [
//     AuthService,
//     PrismaService,
//     JwtStrategy,
//     FacebookStrategy,
//     GoogleStrategy,
//     Auth0Strategy,
//     SessionSerializer, // Necesario para serializar/deserializar sesiones con Auth0
//   ],
//   exports: [AuthService],
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Sin sesiones
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    FacebookStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}