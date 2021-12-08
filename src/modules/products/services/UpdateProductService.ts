import Product from '@modules/products/infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const redisCache = new RedisCache();
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    redisCache.invalidate('api-teste-PRODUCTS_LIST');
    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
