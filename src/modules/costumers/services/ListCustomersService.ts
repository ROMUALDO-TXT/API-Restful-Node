import { getCustomRepository } from "typeorm";
import IPaginateCustomer from "../dtos/IPaginateCustomers";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

class ListCustomerService {
    public async execute(): Promise<IPaginateCustomer> {
      const customersRepository = getCustomRepository(CustomersRepository);
  
      const customers = await customersRepository.createQueryBuilder().paginate();
  
      return customers as IPaginateCustomer;
    }
  }
  
  export default ListCustomerService;