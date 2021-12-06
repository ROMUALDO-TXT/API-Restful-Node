import IFindProducts from '@modules/products/dtos/IFindProducts';
import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
  public async findAllByIds(products: IFindProducts[]){
      const productIds = products.map(product => product.id);
      
      const produtosExistentes = this.find({
        where: {
          id: In(productIds),
        }
      });

      return produtosExistentes;
  }
}
