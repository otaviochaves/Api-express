
import { MysqlClient } from '@/database/mysl.database';
import { UpdateProductUseCase } from '../update-product';
import ProductRepository from '@/repositories/product.repository';

export function makeAuthenticateUseCase() {
  const mysql = new MysqlClient()
  const usersRepository = new ProductRepository(mysql)
  const updateProduct = new UpdateProductUseCase(usersRepository)

  return updateProduct
}
