export interface Task {
  tid: string;
  title: string;
  content?: string;
  updatedAt: Date;
  createdAt: Date;
}