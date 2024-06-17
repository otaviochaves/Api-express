import { Request, Response } from 'express';
import { makeUpdateProductUseCase } from '@/use-cases/factories/make-update-product';

export async function updateProductController(req: Request, res: Response) {
  const { name, description, price, quantity } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: 'Product ID is required' });
  }

  if (!name || !description || typeof price !== 'number' || typeof quantity !== 'number') {
    return res.status(400).send({ message: 'All fields are required and must be valid' });
  }

  try {
    const updateProductUseCase = makeUpdateProductUseCase();

    const result = await updateProductUseCase.execute(id, {
      name,
      description,
      price,
      quantity,
    });

    if (!result) {
      return res.status(404).send({ message: 'Product not found' });
    }

    return res.status(200).send({ message: 'Product updated successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
