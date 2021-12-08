import AppError from '@shared/errors/AppError';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  constructor(private customersRepository: ICustomersRepository){}

  public async execute({ id }: IRequest): Promise<ICustomer> {

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
