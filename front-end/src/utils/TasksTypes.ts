export type TaskStatus = "CANCELLED" | "BACKLOG" | "ACTIVE" | "FINISHED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  ownerEmail: string;
}
