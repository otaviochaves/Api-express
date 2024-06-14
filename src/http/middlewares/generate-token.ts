import jwt from 'jsonwebtoken';

export function generateToken(payload: any): string {
    return jwt.sign(
      payload,
      'secretpassword',
      { expiresIn: '1h' }
    );
}
