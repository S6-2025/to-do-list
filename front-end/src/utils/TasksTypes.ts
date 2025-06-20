

export type TaskStatus = "backlog" | "in_progress" | "done";

export type Task = {
  id: number;
  title: string;
  assignedTo: string;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  description: string;
};
