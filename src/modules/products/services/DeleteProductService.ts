import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';



class DeleteProductService {
  constructor(private productsRepository: IProductsRepository){}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }
    redisCache.invalidate('api-teste-PRODUCTS_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
