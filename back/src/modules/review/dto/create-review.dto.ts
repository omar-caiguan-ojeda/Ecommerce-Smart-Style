import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'User ID who wrote the review' })
  @IsUUID('4', { message: 'The userId must be a valid UUID.' })
  userId: string;

  @ApiProperty({ example: '770e8400-e29b-41d4-a716-446655440002', description: 'Product ID being reviewed' })
  @IsUUID('4', { message: 'The productId must be a valid UUID.' })
  productId: string;

  @ApiProperty({ example: 'Great product! Highly recommended.', description: 'Review comment' })
  @IsNotEmpty({ message: 'Comment is required.' })
  @IsString({ message: 'Comment must be a string.' })
  @Length(10, 500, { message: 'Comment must be between 10 and 500 characters.' })
  comment: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  @IsInt({ message: 'Rating must be an integer.' })
  @Min(1, { message: 'Rating must be at least 1.' })
  @Max(5, { message: 'Rating cannot exceed 5.' })
  rating: number;
}
