import { Book } from '@interfaces/books.interface';
import { DB } from '@database';

class BookService {
  public books = DB.Books;

  public async findAllBooks(): Promise<Book[]> {
    const allBooks = await this.books.findAll();
    return allBooks;
  }

  public async findBookById(bookId: number): Promise<Book> {
    const book = await this.books.findByPk(bookId);
    return book;
  }

  public async createBook(bookData: Book): Promise<Book> {
    const book = await this.books.create(bookData);
    return book;
  }

}

export default BookService;