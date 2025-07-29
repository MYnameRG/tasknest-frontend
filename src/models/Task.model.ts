export interface Task {
  tid: number;
  title: string;
  content?: string;
  updatedAt: Date;
  createdAt: Date;
}