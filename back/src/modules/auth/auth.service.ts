// auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Registro con email/password
  async register(registerUserDto: RegisterUserDto) {
    const { email, password, ...userData } = registerUserDto;
    
    // Verificar si el email ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await this.prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email,
        password: hashedPassword,
        phoneNumber: userData.phoneNumber,
        profilePicture: userData.profilePicture, // Opcional, puede ser undefined
        dateOfBirth: new Date(userData.dateOfBirth), // Convertir string a Date
      },
    });

    // Generar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  }



  // Registro/Login con Facebook o Google
  async socialLogin(profile: any, provider: 'facebook' | 'google') {
    const providerIdField = provider === 'facebook' ? 'facebookId' : 'googleId';
    const providerId = profile[providerIdField];

    // Buscar usuario existente por ID del proveedor o email
    let user = await this.prisma.user.findFirst({
      where: { OR: [{ [providerIdField]: providerId }, { email: profile.email }] },
    });

    if (!user) {
      // Crear nuevo usuario si no existe
      user = await this.prisma.user.create({
        data: {
          [providerIdField]: providerId,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: '', // Campo obligatorio, podrías pedirlo después
          profilePicture: '',
          dateOfBirth: new Date('1990-01-01'), // Valor por defecto, ajusta según necesidad
        },
      });
    } else if (!user[providerIdField]) {
      // Vincular proveedor a cuenta existente
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { [providerIdField]: providerId },
      });
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
    };
  }





  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Buscar usuario
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificar contraseña
    if (!user.password) {
        throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Actualizar última fecha de login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}