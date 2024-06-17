import { Request, Response } from 'express';
import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product';

export async function createProductController(req: Request, res: Response) {
  const { name, description, price, quantity } = req.body;

  if (!name || !description || typeof price !== 'number' || typeof quantity !== 'number') {
    return res.status(400).send({ message: 'All fields are required and must be valid' });
  }

  try {
    const createProductUseCase = makeCreateProductUseCase();

    await createProductUseCase.execute({
      name,
      description,
      price,
      quantity,
    });

    return res.status(201).send({ message: 'Product created successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
