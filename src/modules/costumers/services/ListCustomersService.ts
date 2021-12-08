import { getCustomRepository } from 'typeorm';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<ICustomerPaginate> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as ICustomerPaginate;
  }
}

export default ListCustomerService;
