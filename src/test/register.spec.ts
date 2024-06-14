import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register';
import * as bcrypt from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { MysqlClient } from '@/database/mysl.database';

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository(new MysqlClient)
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      username: 'Otavio Chaves',
      email: 'otaviochaves@gmail.com',
      password: '123456',
    })

    expect(user.username).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      username: 'Otavio Chaves',
      email: 'otaviochaves@gmail.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be alble to register with same email twice', async () => {
    const email = 'otaviochaves@gmail.com'

    await sut.execute({
      username: 'Otavio Chaves',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        username: 'Otavio Chaves',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
