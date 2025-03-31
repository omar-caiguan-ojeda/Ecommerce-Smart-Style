import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsOptional, IsString, Length, Matches } from "class-validator";
import { IsAdult } from "src/common/validators/is-adult.validator";
import { IsPastDate } from "src/common/validators/is-past-date.validator";
import { Match } from "src/common/validators/match.validator";

export class UpdateUserDto {

    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @IsOptional()
    @IsString({ message: 'The firstname field must be of type string.' })
    @Length(3, 50, { message: 'The firstname field must be 3 to 50 characters long.' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    @IsOptional()
    @IsString({ message: 'The lastname field must be of type string.' })
    @Length(3, 50, { message: 'The lastname field must be 3 to 50 characters long.' })
    lastName: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'User email address' })
    @IsOptional()
    @IsEmail({}, { message: 'This field must contain a valid email.' })
    email: string;

    @ApiProperty({ example: 'Password123!', description: 'User password (8-15 characters, at least one uppercase, one number, one special character)' })
    @IsOptional()
    @IsString({ message: 'The password field must be of type string.' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        { message: 'The password entered must include at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*) and be between 8 and 15 characters long.' }
    )
    password: string;

    @ApiProperty({ example: 'Password123!', description: 'Confirm password', required: true })
    @IsOptional()
    @IsString({ message: 'The confirm password field must be of type string.' })
    @Match('password', { message: 'The passwords do not match.' }) // 🔥 Validación personalizada
    confirmPassword: string

    @ApiProperty({ example: '+1234567890', description: 'User phone number (E.164 format)' })
    @IsOptional()
    @IsString({ message: 'The phone number field must be of type string.' })
    @Matches(
        /^\+?[1-9]\d{1,14}$/,
        { message: 'Enter a valid phone number (E.164 format, e.g., +1234567890).',
    })
    phoneNumber: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth (YYYY-MM-DD)' })
    @IsOptional()
    @IsDateString({}, { message: 'The date must be in the format YYYY-MM-DD' })
    @IsPastDate({ message: 'The date of birth must be in the past.' })
    @IsAdult({ message: 'You must be over 18 years old to register.' })
    dateOfBirth: string;

}
