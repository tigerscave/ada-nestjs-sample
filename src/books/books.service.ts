import { Injectable } from '@nestjs/common';
import { BOOKS } from './books.mock';

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.books);
    });
  }
}
