import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import BookModel from '@models/books.model';
import ShoppingCartModel from '@models/shoppingCart.model';
import ShoppingCartItemsModel from '@models/shoppingCartItems.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

// Initialize models
const Users = UserModel(sequelize);
const Books = BookModel(sequelize);
const ShoppingCart = ShoppingCartModel(sequelize);
const ShoppingCartItems = ShoppingCartItemsModel(sequelize);

// Model relationships are listed here
Users.hasOne(ShoppingCart, { foreignKey: 'user_id', sourceKey: 'id' });
ShoppingCart.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'id' });
ShoppingCart.hasMany(ShoppingCartItems, { foreignKey: 'shopping_cart_id', sourceKey: 'id', as: 'items' });
ShoppingCartItems.belongsTo(ShoppingCart, { foreignKey: 'shopping_cart_id', targetKey: 'id', as: 'shoppingCart' });
ShoppingCartItems.belongsTo(Books, { foreignKey: 'book_id', targetKey: 'id' });

export const DB = {
  Users,
  Books,
  ShoppingCart,
  ShoppingCartItems,
  sequelize,
  Sequelize,
};
