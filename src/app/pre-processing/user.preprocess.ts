import type { User } from "../models/User.model";

export const processUser = (user: any) => {
    return {
        uid: user?._id,
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
    } as User;
};