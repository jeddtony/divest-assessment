import { Sequelize, DataTypes, Model } from 'sequelize';
import { Book } from '@interfaces/books.interface';

export class BookModel extends Model<Book> implements Book {
  public id: number;
  public title: string;
  public author: string;
  public genre: string;
  public is_available: boolean;
  public price: number;
  public stock_quantity: number;
  public description: string;
  public created_at: Date;
  public updated_at: Date;
}

export const BookSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20, // default stock quantity for quick testing
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};
