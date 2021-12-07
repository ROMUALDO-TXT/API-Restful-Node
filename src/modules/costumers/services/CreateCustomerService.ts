import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';


class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('customer already exists!');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
