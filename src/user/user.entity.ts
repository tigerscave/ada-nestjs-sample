import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
    nullable: true
  })
  user_name: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    length: 255,
    nullable: true
  })
  photo_url: string;

  @Column({ length: 100, nullable: true })
  password: string|undefined;

  @Column({ length: 100, nullable: true })
  passwordHash: string|undefined;
}