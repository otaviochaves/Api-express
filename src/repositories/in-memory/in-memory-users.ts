import { randomUUID } from 'node:crypto';
import { UserRepository } from '../user.repository';
import { MysqlClient } from '@/database/mysl.database';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export class InMemoryUsersRepository implements UserRepository {
  constructor(readonly mysql: MysqlClient) {  }
  
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  async create(user: any): Promise<User> {
    const newUser: User = {
      ...user,
    id: randomUUID(),
    };
    this.items.push(newUser);
    return newUser;
  }
}
