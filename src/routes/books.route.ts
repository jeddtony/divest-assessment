import { Router } from 'express';
import { BooksController } from '@controllers/books.controller';
import { CreateBookDto } from '@dtos/books.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public books = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.books.getBooks);
  }
}