import { ApiProperty, } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';


export class LoginUserDto {

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
}