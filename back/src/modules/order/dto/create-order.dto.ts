import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'User ID placing the order' })
  @IsNotEmpty({ message: 'Enter userId.' })
  @IsUUID('4', { message: 'The userId must be a valid UUID.' })
  userId: string;

  @ApiProperty({ example: '770e8400-e29b-41d4-a716-446655440002', description: 'Shipping Address ID', required: false })
  @IsUUID('4', { message: 'The shippingAddressId must be a valid UUID.' })
  @IsOptional()
  shippingAddressId?: string;

  @ApiProperty({ example: OrderStatus.PENDING, enum: OrderStatus, description: 'Order status' })
  @IsEnum(OrderStatus, { message: 'Status must be either PENDING, PAID, or CANCELLED.' })
  status: OrderStatus;
}
