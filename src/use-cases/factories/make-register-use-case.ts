import { RegisterUseCase } from './../user/register';
import UserRepository from '@/repositories/user.repository';
import { MysqlClient } from '@/database/mysl.database';

export function makeRegisterUseCase() {
  const mysql = new MysqlClient()
  const usersRepository = new UserRepository(mysql)
  const registerUserCase = new RegisterUseCase(usersRepository)

  return registerUserCase
}
