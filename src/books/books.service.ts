import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>){
    console.log('book service called');
  }

  async addBook(book): Promise<any> {
    return await this.bookRepository.save(book);
  }

  async getBooks(): Promise<any> {
    return this.bookRepository.find({
      order: {
        id: "ASC"
      }
    });
  }

  async getBook(bookID): Promise<any> {
    let id = Number(bookID);
    return this.bookRepository.findOne(id);
  }

  async deleteBook(bookID): Promise<any> {
    let id = Number(bookID);
    const book = await this.bookRepository.findOne(id);
    return this.bookRepository.remove(book);
  }

  async updateBook(query): Promise<any> {
    const { bookID, title, description, author } = query;
    const id = Number(bookID);
    const book = await this.bookRepository.findOne(id);
    book.title = title;
    book.description = description;
    book.author = author;
    return await this.bookRepository.save(book);
  }
}
