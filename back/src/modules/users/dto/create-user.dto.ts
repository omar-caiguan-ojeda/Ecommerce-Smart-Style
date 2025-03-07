import { IsEmail, IsOptional, IsString, IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  
    @IsNotEmpty({ message: 'Enter your firstname.' })
    @IsString({ message: 'The firstname field must be of type string.' })
    firstName: string;

    @IsNotEmpty({ message: 'Enter your lastname.' })
    @IsString({ message: 'The lastname field must be of type string.' })
    lastName: string;

    @IsNotEmpty({ message: 'Enter your email.' })
    @IsEmail({}, { message: 'This field must contain a valid email.' })
    email: string;

    @IsNotEmpty({ message: 'Enter your password.' })
    @IsString({ message: 'The password field must be of type string.' })
    password: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  role?: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @IsOptional()
  @IsDateString()
  resetPasswordExpires?: string;

  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;
}
