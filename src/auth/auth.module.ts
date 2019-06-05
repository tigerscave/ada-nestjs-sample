import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})

export class AuthModule {}