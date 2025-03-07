import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, Length, IsBoolean, IsEnum } from 'class-validator';

enum AddressType {
  SHIPPING = 'SHIPPING',
  BILLING = 'BILLING',
}

export class CreateAddressDto {

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'User ID associated with the address' })
  @IsUUID('4', { message: 'The userId must be a valid UUID.' })
  userId: string;

  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  @IsNotEmpty({ message: 'Street is required.' })
  @IsString({ message: 'Street must be a string.' })
  @Length(3, 100, { message: 'Street must be between 3 and 100 characters.' })
  street: string;

  @ApiProperty({ example: 'New York', description: 'City name' })
  @IsString({ message: 'City must be a string.' })
  @IsNotEmpty({ message: 'City is required.' })
  @Length(2, 50, { message: 'City must be between 2 and 50 characters.' })
  city: string;

  @ApiProperty({ example: 'NY', description: 'State or province' })
  @IsString({ message: 'State must be a string.' })
  @IsNotEmpty({ message: 'State is required.' })
  @Length(2, 50, { message: 'State must be between 2 and 50 characters.' })
  state: string;

  @ApiProperty({ example: 'USA', description: 'Country' })
  @IsString({ message: 'Country must be a string.' })
  @IsNotEmpty({ message: 'Country is required.' })
  @Length(2, 50, { message: 'Country must be between 2 and 50 characters.' })
  country: string;

  @ApiProperty({ example: '10001', description: 'Postal or ZIP code' })
  @IsString({ message: 'Postal code must be a string.' })
  @IsNotEmpty({ message: 'Postal code is required.' })
  @Length(3, 20, { message: 'Postal code must be between 3 and 20 characters.' })
  postalCode: string;

  @ApiProperty({ example: AddressType.SHIPPING, enum: AddressType, description: 'Type of address (SHIPPING or BILLING)' })
  @IsEnum(AddressType, { message: 'Type must be either SHIPPING or BILLING.' })
  type?: AddressType;

  @ApiPropertyOptional({ example: true, description: 'Indicates if this is the default address for the user' })
  @IsBoolean({ message: 'isDefault must be a boolean.' })
  isDefault?: boolean;
}
