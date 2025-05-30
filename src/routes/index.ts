import { Router } from "express";
import authRoutes from "./auth";
import analyzeRoutes from "./analysis";
import userRoutes from "./user";
import { authMiddleware } from "../middlewares/auth";


const routes: Router = Router()

routes.use('/', authRoutes)
routes.use('/user', authMiddleware, userRoutes )
routes.use('/analysis',  authMiddleware,analyzeRoutes)

export default routes