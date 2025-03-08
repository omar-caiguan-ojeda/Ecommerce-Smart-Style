import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaClient],
})
export class ReviewModule {}
