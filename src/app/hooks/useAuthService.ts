import { useState } from 'react';
import UserService from '../services/user.service';
import localStorageService from '../services/local-storage.service';

type hookReturn = {
    isLoading: boolean,
    isError: boolean,
    message: string | null,
    registerUser: (data: any) => Promise<any>,
    loginUser: (data: any) => Promise<any>,
    logoutUser: () => void
};

export const useAuthService = (): hookReturn => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const registerUser = async (data: any) => {
        try {
            setIsLoading(true);
            setMessage(null);
            setIsError(false);

            const res = await UserService.register(data);
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));

            console.log(res?.data)
            return res?.data;
        } catch (err: any) {
            setIsError(true);
            setMessage(err?.response?.data?.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async (data: any) => {
        try {
            setIsLoading(true);
            setMessage(null);
            setIsError(false);

            const res = await UserService.login(data);
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));

            localStorageService.setItem("user", {
                ...(res?.data)?.user,
                token: res?.data?.token
            })

            console.log(res?.data)
            return res?.data;
        } catch (err: any) {
            setIsError(true);
            setMessage(err?.response?.data?.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    const logoutUser = () => {
        try {
            setIsLoading(true);
            setIsError(false);

            localStorageService.clearItems();
        } catch (err: any) {
            setIsError(true);
            setMessage(err?.response?.data?.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isError,
        message,
        registerUser,
        loginUser,
        logoutUser
    };
}