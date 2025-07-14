import { getMockedDB } from './utils/test-db-mock';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { App } from '@/app';
import { CreateBookDto } from '@dtos/books.dto';
import { BooksRoute } from '@routes/books.route';

jest.mock('@middlewares/auth.middleware', () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Books', () => {
  describe('[GET] /books', () => {
    it('response findAll books', async () => {
      const booksRoute = new BooksRoute();
      const DB = getMockedDB();

      DB.Books.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          title: 'The Lord of the Rings',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
          is_available: true,
          price: 2500,
          stock_quantity: 10,
          description: 'An epic fantasy novel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Dune',
          author: 'Frank Herbert',
          genre: 'Science Fiction',
          is_available: true,
          price: 2200,
          stock_quantity: 5,
          description: 'A science fiction masterpiece',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
          is_available: false,
          price: 1800,
          stock_quantity: 0,
          description: 'A dystopian social science fiction novel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}`).expect(200);
    });

    it('response findAll books with search by title', async () => {
      const booksRoute = new BooksRoute();
      const DB = getMockedDB();

      DB.Books.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          title: 'The Lord of the Rings',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
          is_available: true,
          price: 2500,
          stock_quantity: 10,
          description: 'An epic fantasy novel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}?title=lord`).expect(200);
    });

    it('response findAll books with search by author', async () => {
      const booksRoute = new BooksRoute();
      const DB = getMockedDB();

      DB.Books.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          title: 'The Lord of the Rings',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
          is_available: true,
          price: 2500,
          stock_quantity: 10,
          description: 'An epic fantasy novel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
          is_available: true,
          price: 2000,
          stock_quantity: 8,
          description: 'A fantasy novel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}?author=tolkien`).expect(200);
    });

    it('response findAll books with search by genre', async () => {
      const booksRoute = new BooksRoute();
      const DB = getMockedDB();

      DB.Books.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          title: 'The Lord of the Rings',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
          is_available: true,
          price: 2500,
          stock_quantity: 10,
          description: 'An epic fantasy novel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
          is_available: true,
          price: 2000,
          stock_quantity: 8,
          description: 'A fantasy novel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}?genre=fantasy`).expect(200);
    });
  });

  describe('[POST] /books', () => {
    it('response Create book', async () => {
      const bookData: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        price: 1500,
        stock_quantity: 5,
        description: 'A test book description',
      };

      const booksRoute = new BooksRoute();
      const DB = getMockedDB();

      DB.Books.create = jest.fn().mockReturnValue({
        id: 1,
        ...bookData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).post(`${booksRoute.path}`).send(bookData).expect(201);
    });
  });


  describe('[GET] /books/:id', () => {
    it('response findOne book', async () => {
      const bookId = 1;

      const booksRoute = new BooksRoute();
      const DB = getMockedDB();

      DB.Books.findByPk = jest.fn().mockReturnValue({
        id: 1,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        is_available: true,
        price: 2500,
        stock_quantity: 10,
        description: 'An epic fantasy novel',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}/${bookId}`).expect(200);
    });
  });
});
