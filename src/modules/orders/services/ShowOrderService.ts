import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IOrder } from '../domain/models/IOrder';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

class ShowOrderService {
  constructor(private ordersRepository: IOrdersRepository){}

  public async execute({ id }: IShowOrder): Promise<IOrder>{

    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order; 
  }
}

export default ShowOrderService;
