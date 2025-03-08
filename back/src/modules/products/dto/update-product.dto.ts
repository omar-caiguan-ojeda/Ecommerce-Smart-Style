import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsString, Length, IsNumber, Min, IsUrl, IsInt, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ example: 'New Smartphone', description: 'Updated product name' })
  @IsString({ message: 'Product name must be a string.' })
  @Length(3, 100, { message: 'Product name must be between 3 and 100 characters.' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description of the product.', description: 'Updated product description' })
  @IsString({ message: 'Product description must be a string.' })
  @Length(10, 500, { message: 'Product description must be between 10 and 500 characters.' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 749.99, description: 'Updated product price' })
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price must be at least 0.' })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 'https://example.com/new-product.jpg', description: 'Updated product image URL' })
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 2, description: 'Updated category ID' })
  @IsInt({ message: 'Category ID must be an integer.' })
  @Min(1, { message: 'Category ID must be a positive integer.' })
  @IsOptional()
  categoryId?: number;
}
