import Product from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    redisCache.invalidate('api-teste-PRODUCTS_LIST');
    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
