import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({ example: 'Home Appliances', description: 'Updated category name' })
  @IsString({ message: 'Category name must be a string.' })
  @Length(3, 50, { message: 'Category name must be between 3 and 50 characters.' })
  @IsOptional()
  name?: string;
}