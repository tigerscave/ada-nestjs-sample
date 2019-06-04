import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from  '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {
  }

  private async validate(userData: User): Promise<any>{
    return await this.userService.findByEmail(userData.email)
  }

  public async login(user: User): Promise<any> {
    return this.validate(user).then((userData) => {
      if(!userData) {
        return { status: 404 }
      }
      const payload = {
        user_id: userData.id,
        user_name: userData.user_name
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: payload,
        status: 200
      }
    })
  }

  public async register(user: User): Promise<any> {
    return this.userService.create(user);
  }

  async createToken() {
    const user: JwtPayload = { email: 'test@email.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return {}
  }
}

