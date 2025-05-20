import { Response, Request } from "express"
import { RegisterUser } from "../types/user";
import HttpError from "../error/error";
import { registerUser } from "../services/auth/register-user";
import { request } from "http";

export const signUp = async (req: Request, res: Response) => {
    console.log(req.body)
    const userData: RegisterUser = req.body;
    try {
        const newUser = await registerUser(userData);
        res.status(201).json(newUser)
    }
    catch (error: unknown) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }}

