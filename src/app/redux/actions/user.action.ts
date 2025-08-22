import type { ReducerCreators } from "@reduxjs/toolkit";

export const LOGOUT_USER_ACTION = (create: ReducerCreators<any>) => {
    return create.reducer((state) => {
        state.user = null;
        state.message = null;
        state.isLoading = false;
        state.isError = false;
    })
};