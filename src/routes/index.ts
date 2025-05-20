import { Router } from "express";
import authRoutes from "./auth";

const routes: Router = Router()

routes.use('/auth', authRoutes)

export default routes