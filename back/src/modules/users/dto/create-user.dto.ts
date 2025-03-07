import { IsEmail, IsOptional, IsString, IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';
import { IsAdult } from 'src/common/validators/is-adult.validator';
import { IsPastDate } from 'src/common/validators/is-past-date.validator';

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

    @IsNotEmpty({ message: 'Enter your phone number.' })
    @IsString({ message: 'The phone number field must be of type string.' })
    phoneNumber?: string;

    @IsOptional()
    @IsString({ message: 'The profile picture field must be of type string.' })
    profilePicture?: string;

    @IsOptional()
    @IsDateString({}, { message: 'The date must be in the format YYYY-MM-DD' })
    @IsPastDate({ message: 'The date of birth must be in the past.' })
    @IsAdult({ message: 'You must be over 18 years old to register.' })
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
