import Product from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-teste-PRODUCTS_LIST',
    );
    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('api-teste-PRODUCTS_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
