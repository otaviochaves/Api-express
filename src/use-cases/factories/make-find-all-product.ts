
import { MysqlClient } from '@/database/mysl.database';
import { FindAllProductUseCase } from '../find-all-product';
import ProductRepository from '@/repositories/product.repository';

export function makeAuthenticateUseCase() {
  const mysql = new MysqlClient()
  const usersRepository = new ProductRepository(mysql)
  const findAllProduct = new FindAllProductUseCase(usersRepository)

  return findAllProduct
}
