import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;
  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async findAll(): Promise<ICustomer[]> {
    const customers = await this.ormRepository.find();

    return customers;
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    const customers = await this.ormRepository.createQueryBuilder().paginate();

    return customers as ICustomerPaginate;
  }

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}
