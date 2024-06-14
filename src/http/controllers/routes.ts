import express from 'express';
import { registerController } from './register.controller';
import { authenticateController } from './authenticate.controller';


const userRoutes = express.Router();

userRoutes.post('/users', registerController);
userRoutes.post('/sessions', authenticateController)

export default userRoutes;

