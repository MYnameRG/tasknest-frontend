import type { ReducerCreators } from "@reduxjs/toolkit";
import { taskService } from "../../services/index";
import type { Task } from "../../models/Task.model";
import { processMultipleTask, processSingleTask } from "../../pre-processing/task.preprocess";

const config = {
    pending: (state: any) => {
        state.tasks = state.tasks || [];
        state.isPending = true;
        state.isRejected = false;
        state.IsFulfilled = false;
    },
    rejected: (state: any, _: any) => {
        state.tasks = state.tasks || [];
        state.isPending = false;
        state.isRejected = true;
        state.IsFulfilled = false;
    },
    fulfilled: (state: any, action: any) => {
        state.tasks = action?.payload?.tasks || state.tasks;
        state.isPending = false;
        state.isRejected = false;
        state.IsFulfilled = true;
    }
}

export const FETCH_TASKS_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ message: string }>(
        async (_, thunkAPI) => {
            try {
                const { tasks: root } = thunkAPI.getState() as any;
                if (root?.tasks && root?.tasks?.length) {
                    return thunkAPI.fulfillWithValue({
                        tasks: root?.tasks,
                        message: 'Task Fetched Successfully!'
                    });
                }

                const res = await taskService.listTask();
                const preprocessedData = processMultipleTask(res?.data?.tasks);
                // await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    tasks: preprocessedData,
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

export const CREATE_TASK_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ task: Task, message: string }, Task>(
        async (payload: Task, thunkAPI) => {
            try {
                const res = await taskService.createTask(payload);
                const preprocessedData = processSingleTask(res?.data?.created);
                // await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    task: preprocessedData,
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
            ...config,
            fulfilled: (state: any, action: any) => {
                state.tasks.push(action?.payload?.task as Task);
                state.isPending = false;
                state.isRejected = false;
                state.IsFulfilled = true;
            }
        }
    );
}

export const DELETE_TASK_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ message: string }, any>(
        async (payload: { id: string }, thunkAPI) => {
            try {
                const res = await taskService.deleteTask(payload?.id);
                // await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    task_id: payload?.id,
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
            ...config,
            fulfilled: (state: any, action: any) => {
                state.tasks = state.tasks.filter((task: Task) => task?.tid !== action?.payload?.task_id);
                state.isPending = false;
                state.isRejected = false;
                state.IsFulfilled = true;
            }
        },
    );
}

export const UPDATE_TASK_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ message: string }, any>(
        async (payload: { id: string, data: any }, thunkAPI) => {
            try {
                const res = await taskService.updateTask(payload?.id, payload?.data);
                const preprocessedData = processSingleTask(res?.data?.updated);
                // await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    task: preprocessedData,
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
            ...config,
            fulfilled: (state: any, action: any) => {
                state.tasks = state.tasks.map((task: Task) => (task?.tid === action?.payload?.task?.tid ? action?.payload?.task : task));
                state.isPending = false;
                state.isRejected = false;
                state.IsFulfilled = true;
            }
        },
    );
}

export const AUTO_CATEGORIZATION_TASKS_THUNK = (create: ReducerCreators<any>) => {
    return create.asyncThunk<{ message: string }>(
        async (_, thunkAPI) => {
            try {
                const res = await taskService.categarizationTasks();
                // await new Promise<void>((resolve, _) => setTimeout(() => resolve(), 3000));
                return thunkAPI.fulfillWithValue({
                    tasks: res?.data?.tasks,
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


