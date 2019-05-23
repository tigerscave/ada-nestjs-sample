import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from './books.mock';

@Injectable()
export class BooksService {
  books = BOOKS;

  addBook(book): Promise<any> {
    const { title, description, author } = book;
    return new Promise(resolve => {
      this.books.push({
        id: this.books.length + 1,
        title,
        description,
        author
      })
      resolve(this.books)
    })
  }

  getBooks(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.books);
    });
  }

  getBook(bookID): Promise<any> {
    let id = Number(bookID);
    return new Promise(resolve => {
      const book = this.books.find(book => book.id === id);
      if(!book) {
        throw new HttpException('Book does not exist! yeah', 404);
      }
      resolve(book);
    })
  }

  deleteBook(bookID): Promise<any> {
    let id = Number(bookID);
    return new Promise(resolve => {
      const index = this.books.findIndex(book => book.id === id);
      if(index === -1) {
        throw new HttpException('Book does not exist! hua', 404);
      }
      this.books = this.books.filter((book) => book.id !== id);
      console.log(this.books)
      resolve(this.books);
    })
  }

  updateBook(query): Promise<any> {
    const { bookID, title, description } = query;
    const id = Number(bookID);
    return new Promise(resolve => {
      this.books = this.books.map((book) => {
        if(book.id === id) {
          return {
            id: book.id,
            title,
            description,
            author: book.author
          }
        } else {
          return book
        }
      })
      console.log(this.books)
      resolve("hoge")
    })
  }
}
