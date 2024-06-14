import { Request, Response, } from 'express';

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: Request, res: Response) => {
    const { role } = req.body

    if (role !== roleToVerify) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
  }
}
