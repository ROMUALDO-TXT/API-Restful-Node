import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import IProductOrder from "@modules/orders/domain/models/IProductOrder";

export interface ICreateOrder {
    customer: ICustomer;
    products: IProductOrder[];
}
  