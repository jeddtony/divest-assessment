import { Sequelize, DataTypes, Model } from 'sequelize';
import { Order } from '@interfaces/order.interface';

export class OrderModel extends Model<Order> implements Order {
  public id: number;
  public user_id: number;
  public order_date: Date;
  public total_amount: number;
  public status: string;
  public created_at?: Date;
  public updated_at?: Date;
}

export default function (sequelize: Sequelize): typeof OrderModel {
  OrderModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      tableName: 'orders',
      sequelize,
    },
  );

  return OrderModel;
}