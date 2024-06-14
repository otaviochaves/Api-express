import { MysqlClient } from "../database/mysl.database";

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

class ProductRepository {
  constructor( readonly mysql: MysqlClient) {}
    async create(product: Product): Promise<any> {
      try {
        const sql =
          'INSERT INTO produtos (name,description,price, quantity) VALUES (?, ?, ?,?)';
        const params = [
            product.name,
            product.description,
            product.price,
            product.quantity
        ];
        await this.mysql.executeSql(sql, params);
        return { message: 'Produto criado com sucesso' };
      } catch (error) {
        return error;
      }
    }
  
    async findById(id: string): Promise<any> {
        try {
          const sql = 'SELECT * FROM produtos WHERE id =?';
          const rows = await this.mysql.executeSql(sql, [id]);
          const products = rows.results;
          return products[0];
        } catch (error) {
          console.error(error);
          return undefined;
        }
    }

    async findAll(): Promise<any> {
        try {
          const sql = 'SELECT * FROM produtos';
          const rows = await this.mysql.executeSql(sql);
          const products = rows.results;
          return products;
        } catch (error) {
          console.error(error);
          return undefined;
        }
    }

    async update(id:string ,product: Product): Promise<any> {
        try {
          const sql =
            'UPDATE produtos SET name =?, description =?, price =?, quantity =? WHERE id =?';
          const params = [
            product.name,
            product.description,
            product.price,
            product.quantity,
            product.id
          ];
          await this.mysql.executeSql(sql, params);
          return { message: 'Produto atualizado com sucesso' };
        } catch (error) {
          return error;
        }
    }

    async delete(id: string): Promise<any> {
        try {
          const sql = 'DELETE FROM produtos WHERE id =?';
          const params = [id];
          await this.mysql.executeSql(sql, params);
          return { message: 'Produto deletado com sucesso' };
        } catch (error) {
          return error;
        }
    }
}

export default ProductRepository;
