import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findAllPaginate(): Promise<IOrderPaginate> {
    const orders = await this.ormRepository
      .createQueryBuilder()
      .leftJoinAndSelect('orders.customer', 'customer')
      .leftJoinAndSelect('orders.order_products', 'order_products')
      .paginate();

    return orders as IOrderPaginate;
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });
    await this.ormRepository.save(order);

    return order;
  }
}
 
