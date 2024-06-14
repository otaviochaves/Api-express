import { randomUUID } from 'node:crypto';
import { MysqlClient } from '@/database/mysl.database';
import ProductRepository from '../product.repository';

interface Product {
    id?: string; // Mudança: ID deve ser uma string, pois está sendo gerado com randomUUID()
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export class InMemoryProductRepository implements ProductRepository {
    constructor(readonly mysql: MysqlClient) {  }

    public items: Product[] = [];

    create(product: any): Promise<any> {
        const newProduct: Product = {
            ...product,
        };
        this.items.push(newProduct);
        return Promise.resolve(newProduct);
    }

    findById(id: string): Promise<Product | null> {
        const foundProduct = this.items.find(item => item.id === id);
        return Promise.resolve(foundProduct || null);
    }

    findAll(): Promise<Product[]> {
        return Promise.resolve(this.items);
    }

    update(id: string, product: any): Promise<Product | null> {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            return Promise.resolve(null);
        }
        this.items[index] = { ...product, id };
        return Promise.resolve(this.items[index]);
    }

    delete(id: string): Promise<boolean> {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return Promise.resolve(this.items.length !== initialLength);
    }
}
