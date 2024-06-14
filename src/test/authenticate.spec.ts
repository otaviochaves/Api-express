// authenticate.usecase.spec.ts

import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users';
import * as bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { MysqlClient } from '@/database/mysl.database';

describe('Authenticate Use Case', () => {
  let userRepository: InMemoryUsersRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository(new MysqlClient); // Usando InMemoryUsersRepository para testes
    sut = new AuthenticateUseCase(userRepository);
  });

  it('should be able to authenticate', async () => {
    const hashedPassword = await bcrypt.hash('123456', 6);
    await userRepository.create({
      username: 'otavio',
      email: 'otaviochaves@gmail.com',
      password: hashedPassword,
    });

    const { user, token } = await sut.execute({
      email: 'otaviochaves@gmail.com',
      password: '123456',
    });

    expect(user.username).toEqual('otavio');
    expect(token).toBeTruthy();
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrongemail@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const hashedPassword = await bcrypt.hash('123456', 6);
    await userRepository.create({
      username: 'otavio',
      email: 'otaviochaves@gmail.com',
      password: hashedPassword,
    });

    await expect(() =>
      sut.execute({
        email: 'otaviochaves@gmail.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
