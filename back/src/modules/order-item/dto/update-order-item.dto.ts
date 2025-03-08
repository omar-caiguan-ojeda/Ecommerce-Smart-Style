import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';
import { IsInt, Min, IsDecimal, IsOptional } from 'class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @ApiPropertyOptional({ example: 3, description: 'Updated quantity of the product' })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ example: '39.99', description: 'Updated price per unit of the product' })
  @IsDecimal({}, { message: 'Price must be a valid decimal number.' })
  @IsOptional()
  price?: string;
}
