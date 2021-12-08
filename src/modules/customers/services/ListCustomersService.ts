import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

class ListCustomerService {
  constructor(private customersRepository: ICustomersRepository){}

  public async execute(): Promise<ICustomerPaginate> {

    const customers = await this.customersRepository.findAllPaginate();

    return customers as ICustomerPaginate;
  }
}

export default ListCustomerService;
