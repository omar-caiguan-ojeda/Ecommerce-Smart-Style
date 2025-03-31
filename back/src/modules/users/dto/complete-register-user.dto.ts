import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, Matches } from "class-validator";
import { IsAdult } from "src/common/validators/is-adult.validator";
import { IsPastDate } from "src/common/validators/is-past-date.validator";

export class CompleteRegisterUserDto {

    @ApiProperty({ example: '+1234567890', description: 'User phone number (E.164 format)' })
    @IsNotEmpty({ message: 'Enter your phone number.' })
    @IsString({ message: 'The phone number field must be of type string.' })
    @Matches(
        /^\+?[1-9]\d{1,14}$/,
        { message: 'Enter a valid phone number (E.164 format, e.g., +1234567890).',
    })
    phoneNumber: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth (YYYY-MM-DD)' })
    @IsNotEmpty({ message: 'Enter your date of birth.' })
    @IsDateString({}, { message: 'The date must be in the format YYYY-MM-DD' })
    @IsPastDate({ message: 'The date of birth must be in the past.' })
    @IsAdult({ message: 'You must be over 18 years old to register.' })
    dateOfBirth: string;

}