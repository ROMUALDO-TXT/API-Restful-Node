import Product from '@modules/products/infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);
    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('Product already exists!');
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-teste-PRODUCTS_LIST');

    return product;
  }
}

export default CreateProductService;
