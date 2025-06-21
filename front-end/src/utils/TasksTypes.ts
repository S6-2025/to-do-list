

export type TaskStatus = "cancelled" | "backlog" | "in_progress" | "done";

export type Task = {
  id: string;
  title: string;
  assignedTo: string;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  description: string;
};
