// users.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompleteRegisterUserDto } from './dto/complete-register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/common/nodemailer/email.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  // Completar registro
  async completeRegister(userId: string, dto: CompleteRegisterUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        phoneNumber: dto.phoneNumber,
        dateOfBirth: new Date(dto.dateOfBirth),
      },
    });
  }

  // Obtener todos los usuarios (solo ADMIN)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        dateOfBirth: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        facebookId: true,
        googleId: true,
      },
    });
  }

  // Obtener un usuario por ID (ADMIN y EMPLOYEE)
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        dateOfBirth: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLogin: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Actualizar usuario por ID
  async update(userId: string, dto: UpdateUserDto) {
    const { password, confirmPassword, ...data } = dto;

    if (password) {
      if (!confirmPassword || password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      data['password'] = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }


  async requestDeactivate(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.isActive) {
        throw new BadRequestException('Account is already deactivated');
      }

      const token = uuidv4();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expira en 24 horas

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          resetPasswordToken: token,
          resetPasswordExpires: expires,
        },
      });

      const deactivateUrl = `${process.env.APP_URL}/users/confirm-deactivate?token=${token}`;
      await this.emailService.sendMail(
        user.email,
        'Confirm Account Deactivation',
        `Click <a href="${deactivateUrl}">here</a> to deactivate your account. This link expires in 24 hours.`,
      );

      return { message: 'Deactivation email sent' };
    } catch (error) {
      console.error('Error requesting deactivation:', error);
      throw new BadRequestException(error.message);
    }  
  }

  // Confirmar desactivación
  async confirmDeactivate(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: false,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return { message: 'Account deactivated successfully' };
  }

  // Solicitar reactivación
  async requestReactivate(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isActive) {
      throw new BadRequestException('Account is already active');
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expira en 24 horas

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    });

    const reactivateUrl = `${process.env.APP_URL}/users/confirm-reactivate?token=${token}`;
    await this.emailService.sendMail(
      user.email,
      'Confirm Account Reactivation',
      `Click <a href="${reactivateUrl}">here</a> to reactivate your account. This link expires in 24 hours.`,
    );

    return { message: 'Reactivation email sent' };
  }

  // Confirmar reactivación
  async confirmReactivate(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return { message: 'Account reactivated successfully' };
  }
}