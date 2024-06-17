import express from 'express';
import { createProductController } from './create-produto.controller';
import { findAllProductController } from './find-all-product.controller';
import { findByIdProductController } from './find-by-id-product.contoller';
import { updateProductController } from './update-product.contoller';
import { deleteProductController } from './delete-product.controller';

const productsRoutes = express.Router();

productsRoutes.post('/products', createProductController);
productsRoutes.get('/products', findAllProductController)
productsRoutes.get('/products/:id', findByIdProductController)
productsRoutes.put('/products/:id', updateProductController)
productsRoutes.delete('/products/:id',deleteProductController)

export default productsRoutes;

