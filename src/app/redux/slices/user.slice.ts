import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { LOGIN_USER_THUNK, LOGOUT_USER_THUNK, REGISTER_USER_THUNK } from "../thunks/user.thunk";

const initialState = {
    users: [],
    currentUser: null,
    isPending: false,
    isRejected: false,
    IsFulfilled: false
};

const UserSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })({
    name: 'user',
    initialState: initialState,
    reducers: (create) => ({
        REGISTER_USER: REGISTER_USER_THUNK(create),
        LOGIN_USER: LOGIN_USER_THUNK(create),
        LOGOUT_USER: LOGOUT_USER_THUNK(create)
    })
})

export const { REGISTER_USER, LOGIN_USER, LOGOUT_USER } = UserSlice.actions;

export default UserSlice.reducer;