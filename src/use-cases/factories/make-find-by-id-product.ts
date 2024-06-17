
import { MysqlClient } from '@/database/mysl.database';
import { FindByIdProductUseCase } from '../find-by-id-product';
import ProductRepository from '@/repositories/product.repository';

export function makeFindByIdProductUseCase() {
  const mysql = new MysqlClient()
  const usersRepository = new ProductRepository(mysql)
  const findByIdProduct = new FindByIdProductUseCase(usersRepository)

  return findByIdProduct
}
