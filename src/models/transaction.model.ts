import { Sequelize, DataTypes, Model } from 'sequelize';
import { Transaction } from '@interfaces/transaction.interface';

export class TransactionModel extends Model<Transaction> implements Transaction {
  public id: number;
  public user_id: number;
  public order_id: number;
  public reference_id: string;
  public amount: number;
  public status: string;
  public created_at?: Date;
  public updated_at?: Date;
}

export default function (sequelize: Sequelize): typeof TransactionModel {
  TransactionModel.init(
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
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reference_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'transactions',
      sequelize,
    },
  );

  return TransactionModel;
}