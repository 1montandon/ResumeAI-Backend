import type { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import HttpError from '../error/error.ts';

export function generateToken(user: User, secret: string) {
  try {
    const accessToken = jwt.sign(user.id, secret);
    return accessToken;
  } catch {
    throw new HttpError(500, 'Error generating token');
  }
}
