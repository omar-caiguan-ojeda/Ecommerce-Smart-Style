import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Shirts',
  })
  @IsString({ message: 'Category name must be a string.' })
  @IsNotEmpty({ message: 'Category name is required.' })
  @Length(3, 50, { message: 'Category name must be between 3 and 50 characters.' })
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'Description of the category',
  })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty( { message: 'Description is required.' })
  @Length(3, 80, { message: 'Category name must be between 3 and 80 characters.' })
  description: string;
}
