import { useState } from 'react';
import TaskService from '../services/task.service';
import type { Task } from '../models/Task.model';
import { processSingleTask, processMultipleTask } from '../pre-processing/task.preprocess';

type Message = {
    type: "";
    message: string;
};

export const useTaskService = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<Message | null>(null);

    const fetchTasks = async () => {
        // setIsLoading(true);
        // setMessage(null);
        // setIsError(false);

        try {
            const res = await TaskService.listTask();
            const preprocess = processMultipleTask(res.data.tasks);
            setTasks([...preprocess]);
        } catch (err: any) {
            // setIsError(true);
            // setMessage(err?.response?.data?.message || 'Error fetching tasks');
        } finally {
            // setIsLoading(false);
        }
    };

    const createTask = async (taskData: any) => {
        setIsLoading(true);
        setMessage(null);
        setIsError(false);

        try {
            const res = await TaskService.createTask(taskData);
            const preprocess = processSingleTask(res.data.created);
            // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));

            setTasks((prev) => [...prev, preprocess]);
        } catch (err: any) {
            setIsError(true);
            setMessage(err?.response?.data?.message || 'Error creating task');
        } finally {
            setIsLoading(false);
        }
    };

    const updateTask = async (id: string, taskData: any) => {
        setIsLoading(true);
        setMessage(null);
        setIsError(false);

        try {
            const res = await TaskService.updateTask(id, taskData);
            const preprocess = processSingleTask(res.data.updated);
            // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));

            setTasks((prev) =>
                prev.map((t: Task) => (t?.tid === id ? preprocess : t))
            );
        } catch (err: any) {
            setIsError(true);
            setMessage(err?.response?.data?.message || 'Error updating task');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTask = async (id: string) => {
        setIsLoading(true);
        setMessage(null);
        setIsError(false);

        try {
            await TaskService.deleteTask(id);
            // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
            
            setTasks((prev) => [...prev.filter((t: Task) => t?.tid !== id)]);
        } catch (err: any) {
            setIsError(true);
            setMessage(err?.response?.data?.message || 'Error deleting task');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        tasks,
        isError,
        isLoading,
        message,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask
    };
}