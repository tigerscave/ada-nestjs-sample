"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const books_mock_1 = require("./books.mock");
let BooksService = class BooksService {
    constructor() {
        this.books = books_mock_1.BOOKS;
    }
    addBook(book) {
        const { title, description, author } = book;
        return new Promise(resolve => {
            this.books.push({
                id: this.books.length + 1,
                title,
                description,
                author
            });
            resolve(this.books);
        });
    }
    getBooks() {
        return new Promise(resolve => {
            resolve(this.books);
        });
    }
    getBook(bookID) {
        let id = Number(bookID);
        return new Promise(resolve => {
            const book = this.books.find(book => book.id === id);
            if (!book) {
                throw new common_1.HttpException('Book does not exist! yeah', 404);
            }
            resolve(book);
        });
    }
    deleteBook(bookID) {
        let id = Number(bookID);
        return new Promise(resolve => {
            const index = this.books.findIndex(book => book.id === id);
            if (index === -1) {
                throw new common_1.HttpException('Book does not exist! hua', 404);
            }
            this.books = this.books.filter((book) => book.id !== id);
            console.log(this.books);
            resolve(this.books);
        });
    }
    updateBook(query) {
        const { bookID, title, description } = query;
        const id = Number(bookID);
        return new Promise(resolve => {
            this.books = this.books.map((book) => {
                if (book.id === id) {
                    return {
                        id: book.id,
                        title,
                        description,
                        author: book.author
                    };
                }
                else {
                    return book;
                }
            });
            console.log(this.books);
            resolve("hoge");
        });
    }
};
BooksService = __decorate([
    common_1.Injectable()
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map