import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IOrder } from '../domain/models/IOrder';
import { IShowOrder } from '../domain/models/IShowOrder';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

class ShowOrderService {
  public async execute({ id }: IShowOrder): Promise<IOrder>{
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order; 
  }
}

export default ShowOrderService;
