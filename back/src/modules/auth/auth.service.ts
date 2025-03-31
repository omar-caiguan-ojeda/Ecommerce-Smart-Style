import { Injectable, ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/common/nodemailer/email.service';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { randomBytes } from 'crypto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, ...userData } = registerUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email,
        password: hashedPassword,
      },
    });

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

  async socialLogin(profile: any, provider: 'facebook' | 'google') {
    const providerIdField = provider === 'facebook' ? 'facebookId' : 'googleId';
    const providerId = profile[providerIdField];

    let user = await this.prisma.user.findFirst({
      where: { OR: [{ [providerIdField]: providerId }, { email: profile.email }] },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          [providerIdField]: providerId,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: '',
          profilePicture: '',
          dateOfBirth: new Date('1990-01-01'),
        },
      });
    } else if (!user[providerIdField]) {
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

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

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

  // Restablecer contraseña
  async resetPassword(dto: ResetPasswordDto) {
    // Buscar todos los usuarios con tokens no expirados
    const users = await this.prisma.user.findMany({
      where: {
        resetPasswordToken: {
          not: null
        },
        resetPasswordExpires: {
          gt: new Date()
        }
      }
    });

    // Encontrar el usuario con el token correcto
    const validUser = users.find(user => user.resetPasswordToken === dto.token);

    if (!validUser) {
      throw new BadRequestException('Token inválido o expirado');
    }

    // Actualizar contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.update({
      where: { id: validUser.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  // Solicitar restablecimiento de contraseña
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Generar token simple (sin hash)
    const resetToken = randomBytes(16).toString('hex');
    
    // Guardar el token tal cual (sin hash)
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hora
      }
    });

    // Enviar email con instrucciones
    const message = `
      Para restablecer tu contraseña, usa el siguiente token en la página de reset:
      
      Token: ${resetToken}
      
      Este token expirará en 1 hora.
    `;

    await this.emailService.sendMail(
      user.email,
      'Restablecer Contraseña',
      message
    );

    return { message: 'Se ha enviado un email con las instrucciones para restablecer la contraseña' };
  }
}