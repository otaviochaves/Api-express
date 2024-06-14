import { MysqlClient } from '@/database/mysl.database';
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product';
import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateProductUseCase } from '@/use-cases/update-product';


describe('Update Product Use Case', () => {
  let productRepository: InMemoryProductRepository;
  let sut: UpdateProductUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository(new MysqlClient);
    sut = new UpdateProductUseCase(productRepository);
  });

  it('should update an existing product', async () => {
    const initialProduct = {
      name: 'Laptop',
      description: 'Powerful laptop with SSD storage',
      price: 1500,
      quantity: 10,
    };
    const createdProduct = await productRepository.create(initialProduct);
    
    const updatedProductData = {
      name: 'Updated Laptop',
      price: 1800,
    };
    const updatedProduct = await sut.execute(createdProduct.id!, updatedProductData);
    expect(updatedProduct).toMatchObject({
      ...initialProduct,
      ...updatedProductData,
    });
  });

  it('should throw an error if product with given id does not exist', async () => {
    const invalidProductId = 'invalid-id';

    await expect(sut.execute(invalidProductId, { name: 'Invalid Product' })).rejects.toThrowError(
      `Product with id ${invalidProductId} not found`
    );
  });

  it('should throw an error if update operation fails', async () => {

    productRepository.update = async (id: string, product: any) => {
      return null;
    };

    const initialProduct = {
      name: 'Tablet',
      description: 'Lightweight tablet with long battery life',
      price: 500,
      quantity: 5,
    };
    const createdProduct = await productRepository.create(initialProduct);
    
    const updatedProductData = {
      name: 'Updated Tablet',
      price: 600,
    };

    await expect(sut.execute(createdProduct.id!, updatedProductData)).rejects.toThrowError(
      `Failed to update product with id ${createdProduct.id}`
    );
  });
});

