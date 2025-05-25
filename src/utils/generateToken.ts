import jwt from 'jsonwebtoken';
import HttpError from '../error/error';
import { User } from '@prisma/client';

export async function generateToken(user: User, secret: string) {
  try {
    const accessToken = jwt.sign({ id: user.id }, secret);
    return accessToken ;
  } catch (error) {
    throw new HttpError(500, 'Error generating token');
  }
}