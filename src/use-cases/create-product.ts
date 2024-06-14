import ProductRepository from '@/repositories/product.repository';

interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

interface RegisterProductCaseRequest {
    name: string;
    description: string;
    price: number;
    quantity: number;

}

interface RegisterProductCaseResponse {
  product: Product;
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    description,
    price,
    quantity,
  }: RegisterProductCaseRequest): Promise<RegisterProductCaseResponse> {

    const product = await this.productRepository.create({
        name,
        description,
        price,
        quantity,
    });

    return {
      product,
    };
  }

 

 
}
