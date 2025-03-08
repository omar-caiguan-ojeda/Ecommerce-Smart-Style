import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ShipmentController],
  providers: [ShipmentService, PrismaClient],
})
export class ShipmentModule {}
