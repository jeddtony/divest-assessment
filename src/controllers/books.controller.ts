import { NextFunction, Request, Response } from 'express';
import { CreateBookDto } from '@dtos/books.dto';
import BookService from '@services/books.service';
import { Book } from '@interfaces/books.interface';

export class BooksController {
  public bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, author, genre } = req.query;

      let findAllBooksData: Book[];

      if (title || author || genre) {
        // If any search parameters are provided, use search functionality
        const searchQuery = title || author || genre;
        findAllBooksData = await this.bookService.searchBooks(searchQuery as string);
      } else {
        // If no search parameters, return all books
        findAllBooksData = await this.bookService.findAllBooks();
      }

      res.status(200).json({ data: findAllBooksData, message: 'List of books' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = Number(req.params.id);
      const findOneBookData: Book = await this.bookService.findBookById(bookId);
      res.status(200).json({ data: findOneBookData, message: 'Book details' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData: CreateBookDto = req.body;
      const createBookData: Book = await this.bookService.createBook(bookData);
      res.status(201).json({ data: createBookData, message: 'Book created' });
    } catch (error) {
      next(error);
    }
  };

  public searchBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({ message: 'Search query is required' });
        return;
      }
      const searchResults: Book[] = await this.bookService.searchBooks(q);
      res.status(200).json({ data: searchResults, message: 'Search results' });
    } catch (error) {
      next(error);
    }
  };
}
