import { Router } from "express";
import { loginController, signUpController } from "../controllers/auth.ts";
const authRoutes: Router = Router();

authRoutes.post('/register', signUpController);
authRoutes.post('/login', loginController);

export default authRoutes;