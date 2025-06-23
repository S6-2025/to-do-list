// src/services/taskService.ts
import api from "./Api";
import { TaskPriority,TaskStatus } from "../utils/TasksTypes";


export const getAllTasks = async () => {
  const response = await api.get("/tasks/all");
  return response.data.tasks;
};

export const getTasksByOwner = async (email: string) => {
  const response = await api.get("/tasks", { params: { email } });
  return response.data.tasks;
};

export const createTask = async (taskData: {
  title: string;
  description: string;
  startDate: string; // yyyy-MM-dd
  endDate: string;   // yyyy-MM-dd
  priority: TaskPriority;
  status: TaskStatus;
  ownerEmail: string;
}) => {
  try {
    const response = await api.post("/tasks/create", taskData);
    console.log("Resposta da API (createTask):", response.data);
    return response.data;
  } catch (error: any) {
    alert("deu erro ao criar task")
    console.error("Erro ao criar task (createTask):", error?.response?.data || error.message);
    throw error; // repassa o erro para o caller tratar se quiser
  }
};

export const updateTask = async (id: string, data: any) => {
  const response = await api.put(`/tasks/update/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/delete/${id}`);
  return response.data;
};

export const checkRole = async () => {
  const response = await api.get("/tasks/check-role");
  return response.data;
};
