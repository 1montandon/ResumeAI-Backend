import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../error/error.ts';

export interface AuthRequest extends Request {
  userID?: string;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new HttpError(401, 'No token provided'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const JWT_SECRET = process.env.JWT_SECRET || '1313GALO';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userID = decoded;

    next();
  } catch {
    next(new HttpError(401, 'Invalid token'));
  }
}
