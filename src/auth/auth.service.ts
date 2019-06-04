import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from  '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {
  }

  private async validate(userData: User): Promise<any>{
    return await this.userService.findByEmail(userData.email)
  }

  public async login(res: any, body: User): Promise<any> {
    if(!(body && body.email && body.password)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email and password are required!' })
    }

    const user = await this.userService.getUserByEmail(body.email);

    if(user) {
      if(await this.userService.compareHash(body.password, user.passwordHash)) {
        return res.status(HttpStatus.OK).json(await this.createToken(user.id, user.email))
      }
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email or password wrong.' })
  }

  public async register(res: any, body: User): Promise<any> {
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

  async createToken(id: number, email: string) {
    const expiresIn = 60 * 60;
    const secretOrKet = 'secret';
    const user: JwtPayload = { email };
    const token = this.jwtService.sign(user)
    return {
      expires_in: expiresIn,
      token,
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return {}
  }
}

