import { NextFunction, Request, Response } from 'express';
import { CreateOrderDto } from '@dtos/order.dto';
import { Order } from '@interfaces/order.interface';
import OrderService from '@services/orderService.service';

export class OrderController {
  public orderService = new OrderService();

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const orderData: CreateOrderDto = req.body;
      const createOrderData: Order = await this.orderService.createOrder({
        ...orderData,
        user_id: userId,
        order_date: new Date(),
      });
      res.status(201).json({ data: createOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}