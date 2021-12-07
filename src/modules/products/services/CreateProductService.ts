import Product from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ICreateProduct } from '../domain/models/ICreateProduct';



class CreateProductService {
  public async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);
    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('Product already exists!');
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-teste-PRODUCTS_LIST');

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
