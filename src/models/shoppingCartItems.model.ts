import { Sequelize, DataTypes, Model } from 'sequelize';
import { ShoppingCartItems } from '@interfaces/shoppingCartItems.interfact';

export class ShoppingCartItemsModel extends Model<ShoppingCartItems> implements ShoppingCartItems {
  public id: number;
  public shopping_cart_id: number;
  public book_id: number;
  public quantity: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ShoppingCartItemsModel {
  ShoppingCartItemsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shopping_cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'shopping_cart_items',
      sequelize,
    },
  );

  return ShoppingCartItemsModel;
}