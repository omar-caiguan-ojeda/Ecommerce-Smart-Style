import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cart-item/cart-item.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { ProductsModule } from './modules/products/products.module';
import { ReviewModule } from './modules/review/review.module';
import { ShipmentModule } from './modules/shipment/shipment.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    PrismaModule, 
    AddressModule,
    CartModule, 
    CartItemModule,
    CategoryModule,
    OrderModule,
    OrderItemModule,
    ProductsModule,
    ReviewModule,
    ShipmentModule,
    TransactionModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
