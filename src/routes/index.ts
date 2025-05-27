import { Router } from "express";
import authRoutes from "./auth";
import analyzeRoutes from "./analyze";
import { authMiddleware } from "../middlewares/auth";


const routes: Router = Router()

routes.use('/auth', authRoutes)
routes.use('/analyze',  authMiddleware,analyzeRoutes)

export default routes