import { IsEmail, IsOptional, IsString, IsBoolean, IsDateString, IsNotEmpty, Length, Matches, IsUrl, IsUUID } from 'class-validator';
import { IsAdult } from 'src/common/validators/is-adult.validator';
import { IsPastDate } from 'src/common/validators/is-past-date.validator';
import { Match } from 'src/common/validators/match.validator';

export class CreateUserDto {
  
    @IsNotEmpty({ message: 'Enter your firstname.' })
    @IsString({ message: 'The firstname field must be of type string.' })
    @Length(3, 50, { message: 'The firstname field must be 3 to 50 characters long.' })
    firstName: string;

    @IsNotEmpty({ message: 'Enter your lastname.' })
    @IsString({ message: 'The lastname field must be of type string.' })
    @Length(3, 50, { message: 'The lastname field must be 3 to 50 characters long.' })
    lastName: string;

    @IsNotEmpty({ message: 'Enter your email.' })
    @IsEmail({}, { message: 'This field must contain a valid email.' })
    email: string;

    @IsNotEmpty({ message: 'Enter your password.' })
    @IsString({ message: 'The password field must be of type string.' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        { message: 'The password entered must include at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*) and be between 8 and 15 characters long.' }
    )
    password: string;

    @IsNotEmpty({ message: 'Re-enter your password.' })
    @IsString({ message: 'The confirm password field must be of type string.' })
    @Match('password', { message: 'The passwords do not match.' }) // 🔥 Validación personalizada
    confirmPassword: string


    @IsNotEmpty({ message: 'Enter your phone number.' })
    @IsString({ message: 'The phone number field must be of type string.' })
    @Matches(
        /^\+?[1-9]\d{1,14}$/,
        { message: 'Enter a valid phone number (E.164 format, e.g., +1234567890).',
    })
    phoneNumber?: string;

    @IsOptional()
    @IsString({ message: 'The profile picture field must be of type string.' })
    @IsUrl({}, { message: 'The profile picture field must be a valid URL.' })
    profilePicture?: string;

    @IsOptional()
    @IsDateString({}, { message: 'The date must be in the format YYYY-MM-DD' })
    @IsPastDate({ message: 'The date of birth must be in the past.' })
    @IsAdult({ message: 'You must be over 18 years old to register.' })
    dateOfBirth?: string;

    @IsOptional()
    @IsString({ message: 'The role field must be of type string (CLIENT | EMPLOYEE | ADMIN).' })
    role?: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';

    @IsOptional()
    @IsBoolean({ message: 'The isActive field must be of boolean type (true or false)' })
    isActive?: boolean;

    @IsOptional()
    @IsUUID('4', { message: 'The resetPasswordToken must be a valid UUID.' })
    resetPasswordToken?: string;

    @IsOptional()
    @IsDateString({}, { message: 'The resetPasswordExpires must be a valid date string.' })
    resetPasswordExpires?: string;

    @IsOptional()
    @IsBoolean({ message: 'The twoFactorEnabled field must be of boolean type (true or false)' })
    twoFactorEnabled?: boolean;
}
