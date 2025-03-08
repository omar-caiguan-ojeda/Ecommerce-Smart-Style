import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002', description: 'Cart ID' })
  @IsUUID('4', { message: 'The cartId must be a valid UUID.' })
  cartId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440003', description: 'Product ID' })
  @IsUUID('4', { message: 'The productId must be a valid UUID.' })
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;
}