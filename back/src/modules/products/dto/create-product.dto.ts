import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumber, Min, IsUrl, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone', description: 'Product name' })
  @IsNotEmpty({ message: 'Product name is required.' })
  @IsString({ message: 'Product name must be a string.' })
  @Length(3, 100, { message: 'Product name must be between 3 and 100 characters.' })
  name: string;

  @ApiProperty({ example: 'Latest smartphone with high-end specs.', description: 'Product description' })
  @IsNotEmpty({ message: 'Product description is required.' })
  @IsString({ message: 'Product description must be a string.' })
  @Length(10, 500, { message: 'Product description must be between 10 and 500 characters.' })
  description: string;

  @ApiProperty({ example: 699.99, description: 'Product price' })
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price must be at least 0.' })
  price: number;

  @ApiProperty({ example: 'https://example.com/product.jpg', description: 'Product image URL' })
  @IsNotEmpty({ message: 'Image URL is required.' })
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  imageUrl: string;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsInt({ message: 'Category ID must be an integer.' })
  @Min(1, { message: 'Category ID must be a positive integer.' })
  categoryId: number;
}
