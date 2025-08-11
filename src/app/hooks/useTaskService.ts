import { useState } from 'react';
import TaskService from '../services/task.service';
import type { Task } from '../models/Task.model';

type Message = {
    type: "";
    message: string;
};

export const useTaskService = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<Message | null>(null);

    const fetchTasks = async () => {
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await TaskService.listTask();
            setTasks(res.data);
        } catch (err: any) {
            setMessage(err?.response?.data?.message || 'Error fetching tasks');
        } finally {
            setIsLoading(false);
        }
    };

    const createTask = async (taskData: any) => {
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await TaskService.createTask(taskData);
            setTasks((prev) => [...prev, res.data]);

            return res.data;
        } catch (err: any) {
            setMessage(err?.response?.data?.message || 'Error creating task');
        } finally {
            setIsLoading(false);
        }
    };

    const updateTask = async (id: string, taskData: any) => {
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await TaskService.updateTask(id, taskData);
            setTasks((prev) =>
                prev.map((t: Task) => (t?.tid === id ? res.data : t))
            );
            return res.data;
        } catch (err: any) {
            setMessage(err?.response?.data?.message || 'Error updating task');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTask = async (id: string) => {
        setIsLoading(true);
        setMessage(null);
        
        try {
            await TaskService.deleteTask(id);
            setTasks((prev) => prev.filter((t: Task) => t?.tid !== id));
        } catch (err: any) {
            setMessage(err?.response?.data?.message || 'Error deleting task');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        tasks,
        isLoading,
        message,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask
    };
}