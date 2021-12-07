import Order from "@modules/orders/infra/typeorm/entities/Order";
import Product from "@modules/products/infra/typeorm/entities/Product";

export interface IOrdersProducts{
    id:string,
    order:Order,
    product:Product,
    price: number;
    quantity: number;
    order_id: string;
    product_id: string;
    created_at: Date;
    updated_at: Date;
}