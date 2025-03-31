// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { RolesGuard } from './guards/roles.guard';
import { EmailService } from 'src/common/nodemailer/email.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Sin sesiones
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    FacebookStrategy,
    GoogleStrategy,
    RolesGuard,
    EmailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}