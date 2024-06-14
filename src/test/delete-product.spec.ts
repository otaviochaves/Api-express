import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteProductUseCase } from '@/use-cases/delete-product';
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product';
import { MysqlClient } from '@/database/mysl.database';

describe('Delete Product Use Case', () => {
  let productRepository: InMemoryProductRepository;
  let sut: DeleteProductUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository(new MysqlClient);
    sut = new DeleteProductUseCase(productRepository);
  });

  it('should delete an existing product', async () => {
    const createdProduct = await productRepository.create({
        id: '1',
        name: 'Laptop',
        description: 'Powerful laptop with SSD storage',
        price: 1500,
        quantity: 10,
    });

    const deletedProduct = await sut.execute(createdProduct.id!);

    expect(deletedProduct).toMatchObject(deletedProduct);

    const foundProduct = await productRepository.findById(createdProduct.id!);
    expect(foundProduct).toBeNull();
  });

  it('should throw an error if product with given id does not exist', async () => {
    const invalidProductId = 'invalid-id';
  
    await expect(sut.execute(invalidProductId)).rejects.toThrowError(
      `Product with id ${invalidProductId} not found`
    );
  });
});
