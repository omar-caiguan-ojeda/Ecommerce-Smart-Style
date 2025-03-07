import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsBoolean, IsDateString, IsNotEmpty, Length, Matches, IsUrl, IsUUID } from 'class-validator';
import { IsAdult } from 'src/common/validators/is-adult.validator';
import { IsPastDate } from 'src/common/validators/is-past-date.validator';
import { Match } from 'src/common/validators/match.validator';

export class CreateUserDto {
    
    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @IsNotEmpty({ message: 'Enter your firstname.' })
    @IsString({ message: 'The firstname field must be of type string.' })
    @Length(3, 50, { message: 'The firstname field must be 3 to 50 characters long.' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    @IsNotEmpty({ message: 'Enter your lastname.' })
    @IsString({ message: 'The lastname field must be of type string.' })
    @Length(3, 50, { message: 'The lastname field must be 3 to 50 characters long.' })
    lastName: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'User email address' })
    @IsNotEmpty({ message: 'Enter your email.' })
    @IsEmail({}, { message: 'This field must contain a valid email.' })
    email: string;

    @ApiProperty({ example: 'Password123!', description: 'User password (8-15 characters, at least one uppercase, one number, one special character)' })
    @IsNotEmpty({ message: 'Enter your password.' })
    @IsString({ message: 'The password field must be of type string.' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        { message: 'The password entered must include at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*) and be between 8 and 15 characters long.' }
    )
    password: string;

    @ApiProperty({ example: 'Password123!', description: 'Confirm password', required: true })
    @IsNotEmpty({ message: 'Re-enter your password.' })
    @IsString({ message: 'The confirm password field must be of type string.' })
    @Match('password', { message: 'The passwords do not match.' }) // 🔥 Validación personalizada
    confirmPassword: string

    @ApiProperty({ example: '+1234567890', description: 'User phone number (E.164 format)' })
    @IsNotEmpty({ message: 'Enter your phone number.' })
    @IsString({ message: 'The phone number field must be of type string.' })
    @Matches(
        /^\+?[1-9]\d{1,14}$/,
        { message: 'Enter a valid phone number (E.164 format, e.g., +1234567890).',
    })
    phoneNumber: string;

    @ApiPropertyOptional({ example: 'https://example.com/profile.jpg', description: 'User profile picture URL' })
    @IsOptional()
    @IsString({ message: 'The profile picture field must be of type string.' })
    @IsUrl({}, { message: 'The profile picture field must be a valid URL.' })
    profilePicture?: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth (YYYY-MM-DD)' })
    @IsNotEmpty({ message: 'Enter your date of birth.' })
    @IsDateString({}, { message: 'The date must be in the format YYYY-MM-DD' })
    @IsPastDate({ message: 'The date of birth must be in the past.' })
    @IsAdult({ message: 'You must be over 18 years old to register.' })
    dateOfBirth?: string;

    // @ApiPropertyOptional({ example: 'CLIENT', description: 'User role (CLIENT | EMPLOYEE | ADMIN)', enum: ['CLIENT', 'EMPLOYEE', 'ADMIN'] })
    // @IsOptional()
    // @IsString({ message: 'The role field must be of type string (CLIENT | EMPLOYEE | ADMIN).' })
    // role?: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';

    // @ApiPropertyOptional({ example: true, description: 'Whether the user is active or not' })
    // @IsOptional()
    // @IsBoolean({ message: 'The isActive field must be of boolean type (true or false)' })
    // isActive?: boolean;

    // @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Password reset token' })
    // @IsOptional()
    // @IsUUID('4', { message: 'The resetPasswordToken must be a valid UUID.' })
    // resetPasswordToken?: string;

    // @ApiPropertyOptional({ example: '2025-12-31T23:59:59Z', description: 'Expiration date for password reset token' })
    // @IsOptional()
    // @IsDateString({}, { message: 'The resetPasswordExpires must be a valid date string.' })
    // resetPasswordExpires?: string;

    // @ApiPropertyOptional({ example: false, description: 'Two-factor authentication enabled' })
    // @IsOptional()
    // @IsBoolean({ message: 'The twoFactorEnabled field must be of boolean type (true or false)' })
    // twoFactorEnabled?: boolean;
}
