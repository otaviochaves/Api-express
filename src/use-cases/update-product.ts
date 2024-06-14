import ProductRepository from '@/repositories/product.repository';

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export class UpdateProductUseCase {
    constructor(private productRepository: ProductRepository) {}
    async execute(id: string, updatedProductData: Partial<Product>): Promise<Product | null> {
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
          throw new Error(`Product with id ${id} not found`);
        }
        const updatedProduct: Product = {
          ...existingProduct,
          ...updatedProductData,
        };
    
        const updatedProductResult = await this.productRepository.update(id, updatedProduct);
        if (!updatedProductResult) {
          throw new Error(`Failed to update product with id ${id}`);
        }
    
        return updatedProductResult;
      }
}