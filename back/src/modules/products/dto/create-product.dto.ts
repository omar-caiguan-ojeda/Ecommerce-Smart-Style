import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUrl, Min, Length, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Smartphone Samsung Galaxy S23',
  })
  @IsString({ message: 'Product name must be a string.' })
  @IsNotEmpty({ message: 'Product name is required.' })
  @Length(3, 100, { message: 'Product name must be between 3 and 100 characters.' })
  name: string;

  @ApiProperty({
    description: 'Latest smartphone with high-end specs.',
    example: 'Product description'
  })
  @IsNotEmpty({ message: 'Product description is required.' })
  @IsString({ message: 'Product description must be a string.' })
  @Length(10, 500, { message: 'Product description must be between 10 and 500 characters.' })
  description: string;

  @ApiProperty({
    description: 'Product price',
    example: 699.99
  })
  @IsNotEmpty({ message: 'Price is required.' })  
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price must be at least 0.' })
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/images/camiseta.jpg'
  })
  @IsOptional()
  @IsString({ message: 'Image URL must be a string.' })
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  imageUrl: string;

  @ApiProperty({
    description: 'Product category ID',
    example: 1
  })
  @IsNotEmpty({ message: 'Category ID is required.' })
  @IsInt({ message: 'Category ID must be an integer.' })
  @Min(1, { message: 'Category ID must be a positive integer.' })
  categoryId: number;
}
