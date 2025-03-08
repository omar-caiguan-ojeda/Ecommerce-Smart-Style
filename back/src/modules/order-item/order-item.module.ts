import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, PrismaClient],
})
export class OrderItemModule {}
