import prisma from "../../prisma/client";
import { RegisterUser } from "../../types/user";
import bcrypt from "bcrypt";

export async function registerUser({
  username,
  email,
  password,
}: RegisterUser) {
  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { email: email }],
    },
  });

  if (existingUser) {
    throw new HttpError(409, "User already exists"); // 409 Conflict
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
