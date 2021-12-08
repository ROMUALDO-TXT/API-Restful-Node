import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import { IUpdateStock } from '../models/IUpdateStock';

interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAll(): Promise<IProduct[]>;
  findAllPaginate(): Promise<IProductPaginate>;
  findAllByIds(ids: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  updateStock(data: IUpdateStock[]): Promise<void>;
}

export { IProductsRepository };
