import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsUUID, Min } from "class-validator";

export class UpdateCartItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440004', description: 'Cart Item ID' })
  @IsUUID('4', { message: 'The cartItemId must be a valid UUID.' })
  cartItemId: string;

  @ApiProperty({ example: 3, description: 'Updated quantity of the product' })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;
}