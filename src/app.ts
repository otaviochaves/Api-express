import express from 'express';
import userRoutes from './http/controllers/user/routes';
import productsRoutes from './http/controllers/product/routes';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(productsRoutes);

export default app;
