import ProductRepository from '@/repositories/product.repository';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export class FindByIdProductUseCase {
    constructor(private productRepository: ProductRepository) {}
    async execute(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);
        return product;
      }
}