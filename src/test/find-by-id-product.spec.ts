import { describe, it, expect, beforeEach } from 'vitest';
import { FindByIdProductUseCase } from '@/use-cases/find-by-id-product';
import ProductRepository from '@/repositories/product.repository';
import { MysqlClient } from '@/database/mysl.database';
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product';

describe('FindByIdProductUseCase', () => {
    let productRepository: InMemoryProductRepository;
    let sut: FindByIdProductUseCase;

    beforeEach(() => {
        productRepository = new InMemoryProductRepository(new MysqlClient);
        sut = new FindByIdProductUseCase(productRepository);
    });

    it('should find a product by ID', async () => {
        const createdProduct = await productRepository.create({
            id: '1',
            name: 'Laptop',
            description: 'Powerful laptop with SSD storage',
            price: 1500,
            quantity: 10,
        });

        const foundProduct = await sut.execute(createdProduct.id);
        expect(foundProduct).toEqual(foundProduct)
    });


    it('should return null for non-existent ID', async () => {
        const foundProduct = await sut.execute('nonexistent-id');

        expect(foundProduct).toBeNull();
    });
});
