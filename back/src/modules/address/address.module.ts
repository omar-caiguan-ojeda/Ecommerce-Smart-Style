import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaClient],
})
export class AddressModule {}
