import HttpError from "../../error/error";
import prisma from "../../prisma/client";
import { UpdateUser, User } from "../../types/user";

export async function updateUser(userID: string, userData: UpdateUser ): Promise<User> {
    const userInfo = await prisma.user.update({
        where: {
            id: userID
        },
        data: userData
    });
    if (!userInfo) {
        throw new HttpError(404, "User not found")
    }
    return userInfo;
}