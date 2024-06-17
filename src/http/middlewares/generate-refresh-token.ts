import jwt from 'jsonwebtoken';
export function generateRefreshToken(payload: any): string {
    return jwt.sign(
      payload,
      'refreshsecretpassword',
      { expiresIn: '7d' }
    );
  }