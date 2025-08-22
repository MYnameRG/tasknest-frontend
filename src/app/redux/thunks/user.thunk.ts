import type { ReducerCreators } from "@reduxjs/toolkit";
import type { User } from "../../models/User.model";
import UserService from "../../services/user.service";

const config = {
    pending: (state: any) => {
        state.data = null;
        state.isPending = true;
        state.isRejected = false;
        state.IsFulfilled = false;
    },
    rejected: (state: any, _: any) => {
        state.data = null;
        state.isPending = false;
        state.isRejected = true;
        state.IsFulfilled = false;
    },
    fulfilled: (state: any, action: any) => {
        state.data = action?.payload?.user;
        state.isPending = false;
        state.isRejected = false;
        state.IsFulfilled = true;
    }
}

export const REGISTER_USER_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk(
        async (payload: User) => {
            const res = await UserService.register(payload);
            return await res.json();
        },
        {
            ...config
        },
    );
}

export const LOGIN_USER_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ user: User, message: String }, User>(
        async (payload: User, thunkAPI) => {
            try {
                const res = await UserService.login(payload);
                await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    user: res?.data?.user,
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

