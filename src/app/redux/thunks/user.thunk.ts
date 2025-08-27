import type { ReducerCreators } from "@reduxjs/toolkit";
import type { User } from "../../models/User.model";
import UserService from "../../services/user.service";
import { processUser } from "../../pre-processing/user.preprocess";

const config = {
    pending: (state: any) => {
        state.currentUser = state.currentUser || null;
        state.isPending = true;
        state.isRejected = false;
        state.IsFulfilled = false;
    },
    rejected: (state: any, _: any) => {
        state.currentUser = state.currentUser || null;
        state.isPending = false;
        state.isRejected = true;
        state.IsFulfilled = false;
    },
    fulfilled: (state: any, action: any) => {
        state.currentUser = action?.payload?.user || state.currentUser;
        state.isPending = false;
        state.isRejected = false;
        state.IsFulfilled = true;
    }
}

export const REGISTER_USER_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ message: string }, User>(
        async (payload: User, thunkAPI) => {
            try {
                const res = await UserService.register(payload);
                await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    message: res?.data?.message,
                });
            }
            catch (err: any) {
                return thunkAPI.rejectWithValue({
                    message: err?.response?.data?.message || 'Something went wrong'
                });
            }
        },
        {
            ...config
        },
    );
}

export const LOGIN_USER_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ user: User, message: string }, User>(
        async (payload: User, thunkAPI) => {
            try {
                const res = await UserService.login(payload);
                const preprocessedData = processUser(res?.data?.user);
                await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    user: preprocessedData,
                    message: res?.data?.message,
                });
            }
            catch (err: any) {
                return thunkAPI.rejectWithValue({
                    message: err?.response?.data?.message || 'Something went wrong'
                });
            }
        },
        {
            ...config
        },
    );
}

export const LOGOUT_USER_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ message: string }, any>(
        async (_, thunkAPI) => {
            try {
                const res = await UserService.logout() as any;
                await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    message: res?.data?.message,
                });
            }
            catch (err: any) {
                return thunkAPI.rejectWithValue({
                    message: err?.response?.data?.message || 'Something went wrong'
                });
            }
        },
        {
            ...config
        },
    );
}

