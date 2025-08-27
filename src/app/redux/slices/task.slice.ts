import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import {
    AUTO_CATEGORIZATION_TASKS_THUNK, CREATE_TASK_THUNK,
    DELETE_TASK_THUNK, FETCH_TASKS_THUNK, UPDATE_TASK_THUNK
} from "../thunks/task.thunk";

const initialState = {
    tasks: [],
    currentTask: null,
    isPending: false,
    isRejected: false,
    IsFulfilled: false
};

const TaskSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })({
    name: 'tasks',
    initialState: initialState,
    reducers: (create) => ({
        FETCH_TASKS: FETCH_TASKS_THUNK(create),
        CREATE_TASK: CREATE_TASK_THUNK(create),
        DELETE_TASK: DELETE_TASK_THUNK(create),
        UPDATE_TASK: UPDATE_TASK_THUNK(create),
        AUTO_CATEGORIZATION_TASKS:AUTO_CATEGORIZATION_TASKS_THUNK(create)
    })
})

export const { FETCH_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK, AUTO_CATEGORIZATION_TASKS } = TaskSlice.actions;

export default TaskSlice.reducer;