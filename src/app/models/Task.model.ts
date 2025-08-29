import { DateTime } from "luxon";

export interface Task {
  tid?: string;
  title: string;
  content?: string;
  category: string;
  priority: number;
  deadline?: DateTime;
  status?: string;
  isArchieve?: boolean;
  updatedAt?: DateTime;
  createdAt?: DateTime;
}