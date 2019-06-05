import {
  Controller, Get, UseGuards,
  Post, Body, Render,
  Response
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from  '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('auth')
  getHellos() {
    return { message: 'Hello World!' }
  }

  @Post('register')
  async register(@Response() res: any, @Body() body: User): Promise<any> {
    return this.authService.register(res, body);
  }

  @Get('login')
  @Render('login')
  helloLogin() {
    return { message: 'login!' }
  }

  @Post('login')
  async login(@Response() res: any, @Body() body: User): Promise<any> {
    return this.authService.login(res, body);
  }
}