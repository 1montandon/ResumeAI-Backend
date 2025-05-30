import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import HttpError from "../error/error";
import { getMeUser } from "../services/user/get-me-user";
import { User } from "@prisma/client";
import { updateUser } from "../services/user/update-user";

export const getMeUserController = async (req: AuthRequest, res: Response, next: NextFunction) =>{
    if(!req.userID){
        throw new HttpError(401, "Unauthorized!")
    }
    const userID = req.userID.id
    try{
        const userInfo = await getMeUser(userID)
        res.status(200).json(userInfo)
    }catch(error){
        next(error)
    }
}

export const updateUserController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.userID){
        throw new HttpError(401, "Unauthorized!")
    }
    const userID = req.userID.id
    const userData = req.body
    try{
        const updatedUser = await updateUser(userID, userData)
        res.status(200).json(updatedUser)
    }catch(error){
        next(error)
    }
}