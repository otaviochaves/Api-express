import { MysqlClient } from "../database/mysl.database";

interface User {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
}

class UserRepository {
  constructor(private readonly mysql: MysqlClient) {}
    async create(user: User): Promise<any> {
      try {
        const sql =
          'INSERT INTO users (username,email,password) VALUES (?, ?, ?)';
        const params = [
          user.username,
          user.email,
          user.password_hash
        ];
        await this.mysql.executeSql(sql, params);
        return { message: 'Usuário criado com sucesso' };
      } catch (error) {
        return error;
      }
    }
  
    async findByEmail(email: string): Promise<any> {
      try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const rows = await this.mysql.executeSql(sql, [email]);
        const users = rows.results;
        return users[0];
      } catch (error) {
        console.error(error);
        return undefined;
      }
    }
}

export default UserRepository;
