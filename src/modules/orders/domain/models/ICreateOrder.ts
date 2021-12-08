import { ICustomer } from "@modules/costumers/domain/models/ICustomer";
import IProductOrder from "@modules/orders/domain/models/IProductOrder";

export interface ICreateOrder {
    customer: ICustomer;
    products: IProductOrder[];
}
  