import type { Response, Request, NextFunction } from "express";
import type { LoginUser, RegisterUser } from "../types/user.ts";
import { registerUser } from "../services/auth/register-user.ts";
import { loginUser } from "../services/auth/login-user.ts";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
    // ver se tem email
    const userData: RegisterUser = req.body;
    try {
        const newUser = await registerUser(userData);
        res.status(201).json(newUser)
    }
    catch (error: unknown) {
        console.log(error)
        next(error) 
    }}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const userData: LoginUser = req.body;
    try {
        const   token = await loginUser(userData);
        res.status(200).json(token)
    }
    catch (error: unknown) {
        console.log(error)
        next(error) 
    } 
}