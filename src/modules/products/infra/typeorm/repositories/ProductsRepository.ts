import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IUpdateStock } from '@modules/products/domain/models/IUpdateStock';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

export class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAll(): Promise<IProduct[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findAllByIds(products: IFindProducts[]) {
    const productIds = products.map(product => product.id);

    const produtosExistentes = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return produtosExistentes;
  }

  public async findAllPaginate(): Promise<IProductPaginate> {
    const products = await this.ormRepository.createQueryBuilder().paginate();

    return products as IProductPaginate;
  }

  public async create({
    name,
    quantity,
    price,
  }: ICreateProduct): Promise<IProduct> {
    const product = this.ormRepository.create({
      name,
      quantity,
      price,
    });
    await this.ormRepository.save(product);

    return product;
  }
  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }
  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.delete(product);
  }
  public async updateStock(data: IUpdateStock[]): Promise<void> {
    await this.ormRepository.save(data);
  }
}
