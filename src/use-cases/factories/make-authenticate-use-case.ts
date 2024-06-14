
import {UserRepository} from '@/repositories/user.repository';
import { MysqlClient } from '@/database/mysl.database';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase() {
  const mysql = new MysqlClient()
  const usersRepository = new UserRepository(mysql)
  const registerUserCase = new AuthenticateUseCase(usersRepository)

  return registerUserCase
}
