import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaClient],
})
export class OrderModule {}
