import ProductRepository from '@/repositories/product.repository';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<any> {
    const productToDelete = await this.productRepository.findById(id);

    if (!productToDelete) {
      throw new Error(`Product with id ${id} not found`);
    }

    await this.productRepository.delete(id);
  }
}
