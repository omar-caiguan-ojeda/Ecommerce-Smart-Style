import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { UpdateCartItemDto } from "src/modules/cart-item/dto/update-cart-item.dto";

export class UpdateCartDto {
    @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'User ID associated with the cart' })
    @IsUUID('4', { message: 'The userId must be a valid UUID.' })
    @IsOptional()
    userId?: string;
  
    @ApiProperty({
      type: [UpdateCartItemDto],
      description: 'Updated list of cart items',
    })
    @IsArray({ message: 'cartItems must be an array.' })
    @ValidateNested({ each: true })
    @Type(() => UpdateCartItemDto)
    cartItems: UpdateCartItemDto[];
  }