import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsUUID, IsOptional } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ example: OrderStatus.PAID, enum: OrderStatus, description: 'Updated order status' })
  @IsEnum(OrderStatus, { message: 'Status must be either PENDING, PAID, or CANCELLED.' })
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({ example: '770e8400-e29b-41d4-a716-446655440002', description: 'Updated shipping address ID' })
  @IsUUID('4', { message: 'The shippingAddressId must be a valid UUID.' })
  @IsOptional()
  shippingAddressId?: string;
}