import { Controller, Get, Render, Param } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @Render('books')
  async getBooks() {
    const books = await this.booksService.getBooks();
    return { books };
  }

  @Get(':bookID')
  @Render('book')
  async getBook(@Param('bookID') bookID: string) {
    const book = await this.booksService.getBook(bookID);
    return { book }
  }
}
