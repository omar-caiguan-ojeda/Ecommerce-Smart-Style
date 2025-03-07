import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsUUID } from 'class-validator';

export class UpdateAddressDto extends OmitType(PartialType(CreateAddressDto), [] as const) {
      @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'User ID associated with the address' })
      @IsUUID('4', { message: 'The userId must be a valid UUID.' })
      userId: string;
}
