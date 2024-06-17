import { Request, Response } from 'express';
import { makeDeleteProductUseCase } from '@/use-cases/factories/make-delete-product';

export async function deleteProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Product ID is required' });
    }

    const deleteProductUseCase = makeDeleteProductUseCase();

    await deleteProductUseCase.execute(id);

    return res.status(200).send({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
