import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    getBooks(): Promise<{
        books: any;
    }>;
    getBook(bookID: string): Promise<{
        book: any;
    }>;
    addBook(createBookDTO: CreateBookDTO): Promise<any>;
    deleteBook(query: any): Promise<{
        books: any;
    }>;
    updateBook(query: any): Promise<void>;
}
