import prisma from "../../prisma/client.ts";
import type { LoginUser } from "../../types/user.ts";
import bcrypt, { compareSync } from "bcrypt";
import HttpError from "../../error/error.ts";
import { generateToken } from "../../utils/generateToken.ts";


export async function loginUser({username, password}: LoginUser): Promise<object> {
 const user = await prisma.user.findFirst({
  where: {
    username: username ,
  },
  });

  if(!user){
  throw new HttpError(404, "User not found")
  }
  if(!compareSync(password, user.password)){
  throw new HttpError(401, "Incorrect Password")
  }
  const accessToken = await generateToken(user, process.env.JWT_SECRET || "1313GALO")
  
  return { accessToken }
}
