import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { Request, Response } from 'express';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';


export async function registerController(
  req: Request, res: Response
) {
  const { username, email, password } = req.body;

  try {
    const registerUserCase = makeRegisterUseCase()

    await registerUserCase.execute({
      username,
      email,
      password,
    })
    return res.status(201).send({message: "Usuario registered"})
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }
    throw err
  }

  return res.status(201).send()
}
