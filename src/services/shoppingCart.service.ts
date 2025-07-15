import { ShoppingCart } from '@interfaces/shoppingCart.interface';
import { AddBookToShoppingCartDto, CreateShoppingCartDto } from '@dtos/shoppingCart.dto';
import { DB } from '@database';

class ShoppingCartService {
  public shoppingCart = DB.ShoppingCart;
  public shoppingCartItems = DB.ShoppingCartItems;

  public async createShoppingCart(shoppingCartData: CreateShoppingCartDto): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCart.create(shoppingCartData);
    return shoppingCart;
  }

  public async getShoppingCart(userId: number): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCart.findOne({
      where: { user_id: userId },
      include: [
        {
          model: this.shoppingCartItems,
          as: 'items',
        },
      ],
    });
    return shoppingCart;
  }

  public async addBookToShoppingCart(shoppingCartData: AddBookToShoppingCartDto): Promise<ShoppingCart> {
    // Check if user has a shopping cart
    let userCart = await this.shoppingCart.findOne({
      where: { user_id: shoppingCartData.user_id },
    });

    // If no cart exists, create one
    if (!userCart) {
      userCart = await this.shoppingCart.create({ user_id: shoppingCartData.user_id });
    }

    // Add book to shopping cart
    await this.shoppingCartItems.create({
      shopping_cart_id: userCart.id,
      book_id: shoppingCartData.book_id,
      quantity: 1,
    });

    return userCart;
  }
}

export default ShoppingCartService;
