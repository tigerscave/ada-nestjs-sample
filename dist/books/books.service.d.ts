export declare class BooksService {
    books: {
        id: number;
        title: string;
        description: string;
        author: string;
    }[];
    addBook(book: any): Promise<any>;
    getBooks(): Promise<any>;
    getBook(bookID: any): Promise<any>;
    deleteBook(bookID: any): Promise<any>;
    updateBook(query: any): Promise<any>;
}
