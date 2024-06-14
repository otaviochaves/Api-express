import express from 'express';
import userRoutes from './http/controllers/routes';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(userRoutes);

export default app;
