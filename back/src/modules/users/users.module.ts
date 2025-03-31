import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from 'src/common/nodemailer/email.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService, 
    PrismaClient, 
    EmailService
  ],
  exports: [UsersService],
})
export class UsersModule {}
