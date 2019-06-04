import { Controller, Get, UseGuards, Post, Body, Render, HttpStatus, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from  '../user/user.entity';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {

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
  async register(@Response() res: any, @Body() body: User): Promise<any> {
    if(!(body && body.email && body.password)){
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'email and password are required' })
    }

    let user = await this.userService.getUserByEmail(body.email);

    if(user) {
      return res.status(HttpStatus.CONFLICT).json({ message: 'Email existed' })
    }

    user = await this.userService.create(body);
    if(user) {
      user.passwordHash = undefined;
    }

    return res.status(HttpStatus.OK).json(user);
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