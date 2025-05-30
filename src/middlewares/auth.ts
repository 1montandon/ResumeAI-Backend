import { Request, Response, NextFunction } from 'express';
import HttpError from '../error/error';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    userID?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next (new HttpError(401, "No token provided"))
    }

    const token = authHeader.split(' ')[1];

    try {
        const JWT_SECRET = process.env.JWT_SECRET || '1313GALO';
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userID = decoded;
        next();
    } catch (err) {
        next(new HttpError(401, 'Invalid token'));
    }
}