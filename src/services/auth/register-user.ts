import bcrypt from 'bcrypt';
import HttpError from '../../error/error.ts';
import prisma from '../../prisma/client.ts';
import type { RegisterUser, RegisterUserResponse } from '../../types/user.ts';

export async function registerUser({
  username,
  email,
  password,
}: RegisterUser): Promise<RegisterUserResponse> {
  email = email.toLowerCase().trim();
  username = username.trim();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new HttpError(409, 'User already exists'); // 409 Conflict
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}
