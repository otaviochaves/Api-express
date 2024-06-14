import jwt from 'jsonwebtoken';
export function generateRefreshToken(payload: any): string {
    return jwt.sign(
      payload,
      'refreshsecretpassword', // sua chave secreta para refresh token aqui
      { expiresIn: '7d' }
    );
  }