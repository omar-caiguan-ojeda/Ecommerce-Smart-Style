import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateShipmentDto } from './create-shipment.dto';
import { IsEnum, IsOptional, IsDate } from 'class-validator';
import { ShipmentStatus } from '@prisma/client';

export class UpdateShipmentDto extends PartialType(CreateShipmentDto) {
  @ApiPropertyOptional({ example: ShipmentStatus.SHIPPED, enum: ShipmentStatus, description: 'Updated shipment status' })
  @IsEnum(ShipmentStatus, { message: 'Status must be PENDING, SHIPPED, DELIVERED, or RETURNED.' })
  @IsOptional()
  status?: ShipmentStatus;

  @ApiPropertyOptional({ example: '2025-03-10T12:00:00.000Z', description: 'Updated shipped date' })
  @IsDate({ message: 'ShippedAt must be a valid date.' })
  @IsOptional()
  shippedAt?: Date;

  @ApiPropertyOptional({ example: '2025-03-15T12:00:00.000Z', description: 'Updated delivered date' })
  @IsDate({ message: 'DeliveredAt must be a valid date.' })
  @IsOptional()
  deliveredAt?: Date;
}
