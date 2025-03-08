import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @IsNotEmpty({ message: 'Category name is required.' })
  @IsString({ message: 'Category name must be a string.' })
  @Length(3, 50, { message: 'Category name must be between 3 and 50 characters.' })
  name: string;
}
