import { Router } from "express";
import authRoutes from "./auth";
import resumeRoutes from "./resume";


const routes: Router = Router()

routes.use('/auth', authRoutes)
routes.use('/resume', resumeRoutes)

export default routes