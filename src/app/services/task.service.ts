import APIService from '../apis/index';
import type { APIProvider } from '../apis/types/types';
import type { Task } from '../models/Task.model';

class TaskService {
  private api: APIProvider = APIService() as APIProvider;
  private baseURL = "/task";

  constructor() {}

  /**
   * Get list of all tasks
   */
  listTask() {
    return this.api.get(`${this.baseURL}/list`);
  }

  /**
   * Create a new task
   */
  createTask(payload: Task) {
    return this.api.post(`${this.baseURL}/add`, payload);
  }

  /**
   * Update a task by ID
   */
  updateTask(id: string, payload: Partial<Task>) {
    return this.api.put(`${this.baseURL}/update/${id}`, payload);
  }

  /**
   * Delete a task by ID
   */
  deleteTask(id: string) {
    return this.api.delete(`${this.baseURL}/remove/${id}`);
  }

  /**
   * Auto-Categorization of all tasks
   */
  categarizationTasks() {
    return this.api.get(`${this.baseURL}/auto-categorize`);
  }
}

export default new TaskService();