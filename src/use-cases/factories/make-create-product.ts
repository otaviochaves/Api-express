
import { MysqlClient } from '@/database/mysl.database';
import { CreateProductUseCase } from '../create-product';
import ProductRepository from '@/repositories/product.repository';

export function makeAuthenticateUseCase() {
  const mysql = new MysqlClient()
  const usersRepository = new ProductRepository(mysql)
  const createProduct = new CreateProductUseCase(usersRepository)

  return createProduct
}
