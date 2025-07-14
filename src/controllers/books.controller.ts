import { NextFunction, Request, Response } from 'express';
import { CreateBookDto } from '@dtos/books.dto';
import BookService from '@services/books.service';
import { Book } from '@interfaces/books.interface';

export class BooksController {
  public bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBooksData: Book[] = await this.bookService.findAllBooks();
      res.status(200).json({ data: findAllBooksData, message: 'List of books' });
    } catch (error) {
      next(error);
    }
  };
}