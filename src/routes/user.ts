import { Router } from "express";
import { getMeUserController } from "../controllers/user";

const userRoutes: Router = Router();

userRoutes.get("/", getMeUserController);

export default userRoutes;