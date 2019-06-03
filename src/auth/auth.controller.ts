import { Controller, Get, UseGuards, Post, Body, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from  './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Get()
  @Render('auth')
  getHellos() {
    return { message: 'Hello World!' }
  }

  @Get('token')
  async createToken(): Promise <any> {
    console.log("hogehoge")
    return await this.authService.createToken()
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {

  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    console.log(user)
    return this.authService.register(user);
  }

  @Get('login')
  @Render('login')
  helloLogin() {
    return { message: 'login!' }
  }

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    console.log("login post")
    return this.authService.login(user);
  }
}