import { Router } from "express";
import authRoutes from "./auth";
import resumeRoutes from "./resume";
import { authMiddleware } from "../middlewares/auth";


const routes: Router = Router()

routes.use('/auth', authRoutes)
routes.use('/resume',  authMiddleware,resumeRoutes)

export default routes