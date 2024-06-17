import { Request, Response } from 'express';
import { makeFindAllProductUseCase } from '@/use-cases/factories/make-find-all-product';

export async function findAllProductController(req: Request, res: Response) {
  try {
    const findAllProductUseCase = makeFindAllProductUseCase();

    const result = await findAllProductUseCase.execute();

    if (!result || result.length === 0) {
      return res.status(404).send({ message: 'No products found' });
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
