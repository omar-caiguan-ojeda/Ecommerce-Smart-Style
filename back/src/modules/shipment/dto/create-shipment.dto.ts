import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, IsEnum, IsString, Length, IsDate } from 'class-validator';
import { ShipmentStatus } from '@prisma/client';

export class CreateShipmentDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'Order ID associated with the shipment' })
  @IsUUID('4', { message: 'The orderId must be a valid UUID.' })
  orderId: string;

  @ApiProperty({ example: 'FedEx', description: 'Carrier responsible for the shipment' })
  @IsNotEmpty({ message: 'Carrier is required.' })
  @IsString({ message: 'Carrier must be a string.' })
  @Length(2, 50, { message: 'Carrier must be between 2 and 50 characters.' })
  carrier: string;

  @ApiProperty({ example: '123456789', description: 'Tracking number', required: false })
  @IsString({ message: 'Tracking number must be a string.' })
  @IsOptional()
  trackingNumber?: string;

  @ApiProperty({ example: ShipmentStatus.PENDING, enum: ShipmentStatus, description: 'Shipment status' })
  @IsEnum(ShipmentStatus, { message: 'Status must be PENDING, SHIPPED, DELIVERED, or RETURNED.' })
  status: ShipmentStatus;

  @ApiProperty({ example: '2025-03-10T12:00:00.000Z', description: 'Date and time when the order was shipped', required: false })
  @IsDate({ message: 'ShippedAt must be a valid date.' })
  @IsOptional()
  shippedAt?: Date;

  @ApiProperty({ example: '2025-03-15T12:00:00.000Z', description: 'Date and time when the order was delivered', required: false })
  @IsDate({ message: 'DeliveredAt must be a valid date.' })
  @IsOptional()
  deliveredAt?: Date;
}
