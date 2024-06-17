import { Request, Response } from 'express';
import { makeFindByIdProductUseCase } from '@/use-cases/factories/make-find-by-id-product';

export async function findByIdProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Product ID is required' });
    }

    const findByIdProductUseCase = makeFindByIdProductUseCase();

    const result = await findByIdProductUseCase.execute(id);

    if (!result) {
      return res.status(404).send({ message: 'Product not found' });
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

