import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.ts';
import analyzeRoutes from './analysis.ts';
import authRoutes from './auth.ts';
import userRoutes from './user.ts';

const routes: Router = Router();

routes.use('/', authRoutes);
routes.use('/user', authMiddleware, userRoutes);
routes.use('/analysis', authMiddleware, analyzeRoutes);

export default routes;
