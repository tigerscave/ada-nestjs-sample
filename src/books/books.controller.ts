import { Controller, Get, Render, Param, Delete, Query, Put, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

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

  @Post()
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO);
    return book;
  }

  @Delete()
  async deleteBook(@Query() query){
    console.log(query)
    const books = await this.booksService.deleteBook(query.bookID);
    return { books }
  }

  @Put()
  async updateBook(@Query() query) {
    console.log("updateBook:", query)
    const book = await this.booksService.updateBook(query);
  }
}
