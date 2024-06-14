import{ Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      } else {
        if (decoded) {
          (req as any).user = decoded;
        }
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
};