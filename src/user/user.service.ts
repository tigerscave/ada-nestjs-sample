import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email })
  }

  async create(user: User): Promise<User> {
    user.passwordHash = await this.generateHash(user.password);
    user.password = undefined;
    return await this.userRepository.save(user)
  }

  async generateHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

}