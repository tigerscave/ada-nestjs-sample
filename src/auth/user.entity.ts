import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  user_name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  photo_url: string;

  @BeforeInsert()
  hashPassword() {
    console.log("hashPassword!!!")
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column('text')
  password: string;
}