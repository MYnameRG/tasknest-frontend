import type { User } from "../models/User.model";

export const processUser = (user: any) => {
    if (!user) return user;
    return {
        uid: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
    } as User;
};