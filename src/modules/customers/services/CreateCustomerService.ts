import AppError from '@shared/errors/AppError';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';



class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository){}

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
