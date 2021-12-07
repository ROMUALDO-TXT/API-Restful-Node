import IProductOrder from "@modules/orders/domain/models/IProductOrder";

export interface ICreateOrder {
    customer_id: string;
    products: IProductOrder[];
}
  