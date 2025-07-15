import { Order } from '@interfaces/order.interface';
import { OrderItems } from '@interfaces/orderItems.interface';
import { DB } from '@database';
import { CreateOrderDto } from '@dtos/order.dto';

class OrderService {
  public order = DB.Order;
  public orderItems = DB.OrderItems;
  public shoppingCart = DB.ShoppingCart;
  public shoppingCartItems = DB.ShoppingCartItems;

  /**
   * Creates a new order from the user's shopping cart
   * @returns {Promise<Order>} The created order
   */
  public async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const transaction = await DB.sequelize.transaction();

    try {
      const shoppingCart = await this.getShoppingCart(orderData.user_id);
      const cartItems = await this.getCartItems(shoppingCart.id);

      await this.checkAndLockInventory(cartItems, transaction);

      const order = await this.createOrderRecord(orderData, cartItems);
      await this.createOrderItems(order.id, cartItems, transaction);
      await this.updateBookInventory(cartItems, transaction);
      await this.clearShoppingCart(shoppingCart.id);

      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Gets the shopping cart for a user
   * @returns {Promise<any>} The shopping cart record
   */
  private async getShoppingCart(userId: number): Promise<any> {
    const shoppingCart = await this.shoppingCart.findOne({ where: { user_id: userId } });
    if (!shoppingCart) {
      throw new Error('Shopping cart not found');
    }
    return shoppingCart;
  }

  /**
   * Gets all items in a shopping cart
   * @returns {Promise<any[]>} Array of cart items with associated book data
   */
  private async getCartItems(cartId: number): Promise<any[]> {
    const cartItems = await this.shoppingCartItems.findAll({
      where: { shopping_cart_id: cartId },
      include: [{ model: DB.Books, as: 'book' }],
    });

    if (cartItems.length === 0) {
      throw new Error('Shopping cart items not found');
    }
    return cartItems;
  }

  /**
   * Creates the order record
   * @returns {Promise<Order>} The created order record
   */
  private async createOrderRecord(orderData: CreateOrderDto, cartItems: any[]): Promise<Order> {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    return await this.order.create({
      ...orderData,
      total_amount: totalAmount,
    });
  }

  /**
   * Creates order items records
   * @returns {Promise<void>}
   */
  private async createOrderItems(orderId: number, cartItems: any[], transaction: any): Promise<void> {
    const orderItems = cartItems.map(item => ({
      order_id: orderId,
      book_id: item.book_id,
      quantity: item.quantity,
      price_at_purchase: item.book.price,
    }));

    await this.orderItems.bulkCreate(orderItems, { transaction });
  }

  /**
   * Clears the shopping items
   * @returns {Promise<void>}
   */
  private async clearShoppingCart(cartId: number): Promise<void> {
    await this.shoppingCartItems.destroy({ where: { shopping_cart_id: cartId } });
  }

  /**
   * Checks inventory availability and locks books for update using pessimistic locking
   * @param {any[]} cartItems - Array of cart items
   * @param {any} transaction - Database transaction
   * @returns {Promise<void>}
   */
  private async checkAndLockInventory(cartItems: any[], transaction: any): Promise<void> {
    for (const item of cartItems) {

      const book = await DB.Books.findByPk(item.book_id, {
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (!book) {
        throw new Error(`Book with ID ${item.book_id} not found`);
      }

      if (book.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for book "${book.title}". Available: ${book.stock_quantity}, Requested: ${item.quantity}`);
      }
    }
  }

  /**
   * Updates book inventory by decrementing quantities
   * @param {any[]} cartItems - Array of cart items
   * @param {any} transaction - Database transaction
   * @returns {Promise<void>}
   */
  private async updateBookInventory(cartItems: any[], transaction: any): Promise<void> {
    for (const item of cartItems) {
      await DB.Books.decrement('stock_quantity', {
        by: item.quantity,
        where: { id: item.book_id },
        transaction,
      });
    }
  }

  /**
   * Gets order history for a user
   * @param {number} userId - The user ID
   * @returns {Promise<Order[]>} Array of orders with their items
   */
  public async getOrderHistory(userId: number): Promise<Order[]> {
    const orders = await this.order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: this.orderItems,
          as: 'items',
          include: [
            {
              model: DB.Books,
              as: 'book',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return orders;
  }
}

export default OrderService;
