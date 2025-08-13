import type { Task } from "../models/Task.model";

export const processSingleTask = (task: any) => {
    return {
        tid: task?._id,
        title: task?.title,
        content: task?.description,
        updatedAt: task?.updatedAt,
        createdAt: task?.createdAt
    } as Task;
};

export const processMultipleTask = (tasks: any[]) => {
    return tasks.map((t: any) => ({
        tid: t?._id,
        title: t?.title,
        content: t?.description,
        updatedAt: t?.updatedAt,
        createdAt: t?.createdAt
    })) as Task[];
};