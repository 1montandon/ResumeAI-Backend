import { Router } from "express";
import { getMeUserController, updateUserController } from "../controllers/user";

const userRoutes: Router = Router();

userRoutes.get("/", getMeUserController);
userRoutes.patch("/", updateUserController)

export default userRoutes;