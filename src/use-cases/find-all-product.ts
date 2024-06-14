import ProductRepository from '@/repositories/product.repository';

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export class FindAllProductUseCase {
    constructor(private productRepository: ProductRepository) {}
async execute(): Promise<Product[]> {
    const users = await this.productRepository.findAll();
    return users;
  }
}