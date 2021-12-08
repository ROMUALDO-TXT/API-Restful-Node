import AppError from '@shared/errors/AppError';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

class DeleteCustomerService {
  constructor(private customersRepository: ICustomersRepository){}

  public async execute({ id }: IDeleteCustomer): Promise<void> {

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
