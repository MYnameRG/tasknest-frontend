export interface Task {
  tid?: string;
  title: string;
  content?: string;
  category: string;
  priority: number;
  deadline?: Date;
  status: string;
  isArchieve?: boolean;
  updatedAt: Date;
  createdAt: Date;
}