import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../../common/decorators/match.decorator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token recibido por email',
    example: '1234567890abcdef'
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'Nueva contraseña',
    example: 'NewPass123!'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
  })
  password: string;

  @ApiProperty({
    description: 'Confirmar nueva contraseña',
    example: 'NewPass123!'
  })
  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword: string;
}