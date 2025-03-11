import { OmitType, PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';

export class UpdateUserDto extends OmitType(PartialType(RegisterUserDto), [] as const){}
