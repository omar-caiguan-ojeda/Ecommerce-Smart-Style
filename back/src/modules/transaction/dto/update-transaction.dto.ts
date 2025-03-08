import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from '@prisma/client';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiPropertyOptional({ example: TransactionStatus.COMPLETED, enum: TransactionStatus, description: 'Updated transaction status' })
  @IsEnum(TransactionStatus, { message: 'Status must be PENDING, COMPLETED, or FAILED.' })
  @IsOptional()
  status?: TransactionStatus;
}
