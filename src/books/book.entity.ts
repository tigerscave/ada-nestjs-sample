import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn() id: number;

  @Column({length: 255 })
  title: string;

  @Column('text') description: string;

  @Column({length: 255}) author: string;
}