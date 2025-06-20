

export type TaskStatus = "cancelled" | "backlog" | "in_progress" | "done";

export type Task = {
  id: number;
  title: string;
  assignedTo: string;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  description: string;
};
