import { MysqlClient } from '@/database/mysl.database';
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product';
import { FindAllProductUseCase } from '@/use-cases/find-all-product';
import { beforeEach, describe, expect, it } from 'vitest';

describe('FindAllProductUseCase', () => {
  let productRepository: InMemoryProductRepository;
  let sut: FindAllProductUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository(new MysqlClient());
    sut = new FindAllProductUseCase(productRepository);
  });

  it('should return all products from repository', async () => {
    await productRepository.create({
        name: 'Laptop',
        description: 'Powerful laptop with SSD storage',
        price: 1500,
        quantity: 10,
    });
    
    const products = await sut.execute();
  
    expect(products[0].name).toEqual('Laptop');
  });
});