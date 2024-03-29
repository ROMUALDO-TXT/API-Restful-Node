import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute(id);

    return response.json(order);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const createOrder = container.resolve(CreateOrderService);

    const order = createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}
