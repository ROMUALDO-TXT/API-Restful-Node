import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowProducts } from '../domain/models/IShowProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ id }: IShowProducts): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
