import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsEnum, IsString, Length } from 'class-validator';
import { TransactionStatus } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'Order ID associated with the transaction' })
  @IsUUID('4', { message: 'The orderId must be a valid UUID.' })
  orderId: string;

  @ApiProperty({ example: TransactionStatus.PENDING, enum: TransactionStatus, description: 'Transaction status' })
  @IsEnum(TransactionStatus, { message: 'Status must be PENDING, COMPLETED, or FAILED.' })
  status: TransactionStatus;

  @ApiProperty({ example: 'Credit Card', description: 'Payment method used for the transaction' })
  @IsNotEmpty({ message: 'Payment method is required.' })
  @IsString({ message: 'Payment method must be a string.' })
  @Length(3, 50, { message: 'Payment method must be between 3 and 50 characters.' })
  paymentMethod: string;
}
