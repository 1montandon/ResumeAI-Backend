import HttpError from "../../error/error";
import prisma from "../../prisma/client";
import { UpdateUser, User } from "../../types/user";

export async function updateUser(userID: string, userData: UpdateUser ): Promise<User> {
    const userInfo = await prisma.user.findUnique({
        where: {
            id: userID
        }
    });
    if (!userInfo) {
    }
    return userInfo;
}