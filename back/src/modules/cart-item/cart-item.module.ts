import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [CartItemController],
  providers: [CartItemService, PrismaClient],
})
export class CartItemModule {}
