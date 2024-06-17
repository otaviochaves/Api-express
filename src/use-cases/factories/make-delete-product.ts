
import { MysqlClient } from '@/database/mysl.database';
import { DeleteProductUseCase } from '../delete-product';
import ProductRepository from '@/repositories/product.repository';

export function makeDeleteProductUseCase() {
  const mysql = new MysqlClient()
  const usersRepository = new ProductRepository(mysql)
  const deleteProduct = new DeleteProductUseCase(usersRepository)

  return deleteProduct
}
