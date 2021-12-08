import Product from '@modules/products/infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-teste-PRODUCTS_LIST',
    );
    if (!products) {
      products = await this.productsRepository.findAll();

      await redisCache.save('api-teste-PRODUCTS_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
