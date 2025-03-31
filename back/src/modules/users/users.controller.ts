// user.controller.ts
import { Controller, Post, Body, Get, Patch, Param, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CompleteRegisterUserDto } from './dto/complete-register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('complete-register')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Complete user registration' })
  @ApiResponse({ status: 200, description: 'Registration completed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async completeRegister(@Req() req, @Body() dto: CompleteRegisterUserDto) {
    return this.usersService.completeRegister(req.user.id, dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @ApiOperation({ summary: 'Get a user by ID (Admin and Employee only)' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  
  /* Funcionalidad de activación/desactivación temporalmente deshabilitada
  @Post('deactivate-request')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Request account deactivation (sends confirmation email)' })
  @ApiResponse({ status: 200, description: 'Deactivation email sent' })
  @ApiResponse({ status: 400, description: 'Account already deactivated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async requestDeactivate(@Req() req) {
    return this.usersService.requestDeactivate(req.user.id);
  }

  @Get('confirm-deactivate')
  @ApiOperation({ summary: 'Confirm account deactivation with token' })
  @ApiQuery({ name: 'token', required: true, description: 'Deactivation token from email' })
  @ApiResponse({ status: 200, description: 'Account deactivated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async confirmDeactivate(@Query('token') token: string) {
    return this.usersService.confirmDeactivate(token);
  }

  @Post('reactivate-request')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Request account reactivation (sends confirmation email)' })
  @ApiResponse({ status: 200, description: 'Reactivation email sent' })
  @ApiResponse({ status: 400, description: 'Account already active' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async requestReactivate(@Req() req) {
    return this.usersService.requestReactivate(req.user.id);
  }

  @Get('confirm-reactivate')
  @ApiOperation({ summary: 'Confirm account reactivation with token' })
  @ApiQuery({ name: 'token', required: true, description: 'Reactivation token from email' })
  @ApiResponse({ status: 200, description: 'Account reactivated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async confirmReactivate(@Query('token') token: string) {
    return this.usersService.confirmReactivate(token);
  }
  */
}