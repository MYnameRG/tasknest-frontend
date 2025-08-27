import type { ReducerCreators } from "@reduxjs/toolkit";

export const LOGOUT_USER_ACTION = (create: ReducerCreators<any>) => {
    return create.reducer((state) => {
        state.data = null;
        state.isPending = false;
        state.isRejected = false;
        state.IsFulfilled = true;
    })
};