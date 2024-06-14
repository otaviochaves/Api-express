import { MysqlClient } from '@/database/mysl.database';
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product';
import { CreateProductUseCase } from '@/use-cases/create-product';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Create Product Use Case', () => {
  let productRepository: InMemoryProductRepository;
  let sut: CreateProductUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository(new MysqlClient);
    sut = new CreateProductUseCase(productRepository);
  });

  it('should create a new product', async () => {

    const { product } = await sut.execute({
        name: 'Laptop',
        description: 'Powerful laptop with SSD storage',
        price: 1500,
        quantity: 10,

    });

    expect(product.name).toEqual(expect.any(String))
  });

  it('should return the created product with generated ID', async () => {
    const productData = {
      name: 'Smartphone',
      description: 'High-quality smartphone with dual camera',
      price: 800,
      quantity: 20,
    };

    const { product } = await sut.execute(productData);

    expect(product).toEqual(expect.objectContaining(productData));
    expect(product.name).toBeDefined();
  });
});
