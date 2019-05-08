import { Controller, Get, Render } from '@nestjs/common';
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
}
