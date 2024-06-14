import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { Request, Response } from 'express';
import { generateToken } from '../middlewares/generate-token';
import { generateRefreshToken } from '../middlewares/generate-refresh-token';


export async function authenticateController(
  req: Request,
  res: Response,
) {

  try {
    const { email, password } = req.body

    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const tokenPayload = { role: user.role };
    const token = generateToken(tokenPayload);
    const refreshTokenPayload = { role: user.role, sub: user.id };
    const refreshToken = generateRefreshToken(refreshTokenPayload);

    res.cookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'strict',
      httpOnly: true,
    });

    res.status(200).json({
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
