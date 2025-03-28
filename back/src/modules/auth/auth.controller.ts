// // auth.controller.ts
// import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Get, Res } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { LoginUserDto } from './dto/login-user.dto';
// import { RegisterUserDto } from './dto/register-user.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Response } from 'express';

// @ApiTags('auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('register')
//   @ApiOperation({ summary: 'Register a new user' })
//   @ApiResponse({ status: 201, description: 'Successfully registered user' })
//   @ApiResponse({ status: 409, description: 'Email already exists' })
//   async register(@Body() registerUserDto: RegisterUserDto) {
//     return this.authService.register(registerUserDto);
//   }

//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ summary: 'Login' })
//   @ApiResponse({ status: 200, description: 'Successful login' })
//   @ApiResponse({ status: 401, description: 'Invalid credentials' })
//   async login(@Body() loginDto: LoginUserDto) {
//     return this.authService.login(loginDto);
//   }


//   @Get('facebook')
//   @UseGuards(AuthGuard('auth0'))
//   async facebookLogin() {
//     // Este endpoint inicia el flujo con Auth0
//   }

//   @Get('callback')
//   @UseGuards(AuthGuard('auth0'))
//   async callback(@Req() req, @Res() res: Response) {
//     const user = req.user;
//     const token = await this.authService.generateJwt(user);
//     res.json({ accessToken: token, user });
//   }








//   // @Get('facebook')
//   // @UseGuards(AuthGuard('facebook'))
//   // async facebookLogin() {
//   //   // Este endpoint inicia el flujo de OAuth con Facebook
//   // }

//   // @Get('facebook/callback')
//   // @UseGuards(AuthGuard('facebook'))
//   // async facebookLoginCallback(@Req() req) {
//   //   return this.authService.socialLogin(req.user, 'facebook');
//   // }

//   @Get('google')
//   @UseGuards(AuthGuard('google'))
//   async googleLogin() {
//     // Este endpoint inicia el flujo de OAuth con Google
//   }

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google'))
//   async googleLoginCallback(@Req() req) {
//     return this.authService.socialLogin(req.user, 'google');
//   }
// }

import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'Successfully registered user' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    // Este endpoint inicia el flujo de OAuth con Facebook
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req) {
    return this.authService.socialLogin(req.user, 'facebook');
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Este endpoint inicia el flujo de OAuth con Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    return this.authService.socialLogin(req.user, 'google');
  }
}