import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { IsString, Length, IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiPropertyOptional({ example: 'Updated comment', description: 'Updated review comment' })
  @IsString({ message: 'Comment must be a string.' })
  @Length(10, 500, { message: 'Comment must be between 10 and 500 characters.' })
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional({ example: 4, description: 'Updated rating from 1 to 5' })
  @IsInt({ message: 'Rating must be an integer.' })
  @Min(1, { message: 'Rating must be at least 1.' })
  @Max(5, { message: 'Rating cannot exceed 5.' })
  @IsOptional()
  rating?: number;
}
