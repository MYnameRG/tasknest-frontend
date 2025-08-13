import { useState } from 'react';
import UserService from '../services/user.service';
import localStorageService from '../services/local-storage.service';
import type { User } from '../models/User.model';
import { processUser } from '../pre-processing/user.preprocess';

type hookReturn = {
    user: User | null,
    isLoading: boolean,
    isError: boolean,
    // message: string | null,
    registerUser: (data: any) => Promise<any>,
    loginUser: (data: any) => Promise<any>,
    logoutUser: () => void
};

export const useAuthService = (): hookReturn => {
    const [user, setUser] = useState({} as User | null);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [message, setMessage] = useState<string | null>(null);

    const registerUser = async (data: any) => {
        try {
            // setIsLoading(true);
            // setMessage(null);
            // setIsError(false);

            await UserService.register(data);
            // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));

            return false;
        } catch (err: any) {
            // setIsError(true);
            // setMessage(err?.response?.data?.message || 'Something went wrong!');

            return true;
        } finally {
            // setIsLoading(false);
        }
    };

    const loginUser = async (data: any) => {
        try {
            // setIsLoading(true);
            // setMessage(null);

            const res = await UserService.login(data);
            const preprocess = processUser(res?.data?.user);

            localStorageService.setItem("user", {
                ...preprocess,
                token: res?.data?.token
            });

            // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
            setUser({ ...preprocess });

            return false;
        } catch (err: any) {
            // setIsError(true);
            // setMessage(err?.response?.data?.message || 'Something went wrong!');

            return true;
        } finally {
            // setIsLoading(false);
        }
    };

    const logoutUser = async () => {
        try {
            // setIsLoading(true);
            // setIsError(false);

            localStorageService.clearItems();

            // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
            // setUser(null);

            return false;
        } catch (err: any) {
            // setIsError(true);
            // setMessage(err?.response?.data?.message || 'Something went wrong!');

            return true;
        } finally {
            // setIsLoading(false);
        }
    };

    return {
        user,
        isLoading,
        isError,
        // message,
        registerUser,
        loginUser,
        logoutUser
    };
}