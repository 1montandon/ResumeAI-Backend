import HttpError from "../../error/error";
import prisma from "../../prisma/client";
import { User } from "../../types/user";

export async function getMeUser(userID: string): Promise<User> {
    const userInfo = await prisma.user.findUnique({
        where: {
            id: userID
        }
    });
    if (!userInfo) {
        throw new HttpError(404, "User not found");
    }
    return userInfo;
}