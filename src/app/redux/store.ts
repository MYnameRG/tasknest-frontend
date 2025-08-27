import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/user.slice";
import taskSliceReducer from "./slices/task.slice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    tasks: taskSliceReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export default store;