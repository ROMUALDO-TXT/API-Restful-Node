import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }
    redisCache.invalidate('api-teste-PRODUCTS_LIST');
    
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
