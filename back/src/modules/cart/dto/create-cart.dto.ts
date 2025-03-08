import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from 'src/modules/cart-item/dto/create-cart-item.dto';

export class CreateCartDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'User ID associated with the cart' })
  @IsUUID('4', { message: 'The userId must be a valid UUID.' })
  userId: string;

  @ApiPropertyOptional({
    type: [CreateCartItemDto],
    description: 'List of cart items',
  })
  @IsArray({ message: 'cartItems must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  @IsOptional()
  cartItems?: CreateCartItemDto[];
}


