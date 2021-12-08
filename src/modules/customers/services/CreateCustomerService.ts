import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository') 
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('customer already exists!');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });
    return customer;
  }
}

export default CreateCustomerService;
