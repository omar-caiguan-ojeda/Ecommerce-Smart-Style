import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsInt, Min, IsDecimal } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440003', description: 'Order ID this item belongs to' })
  
  @IsUUID('4', { message: 'The orderId must be a valid UUID.' })
  orderId: string;

  @ApiProperty({ example: '990e8400-e29b-41d4-a716-446655440004', description: 'Product ID being ordered' })
  @IsUUID('4', { message: 'The productId must be a valid UUID.' })
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;

  @ApiProperty({ example: '49.99', description: 'Price per unit of the product' })
  @IsDecimal({}, { message: 'Price must be a valid decimal number.' })
  price: string;
}