import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import Board from "../components/Board";
import { Task, TaskPriority, TaskStatus } from "../utils/TasksTypes";
import { useAuth } from "../context/AuthContext";
import { createTask, getAllTasks, updateTask } from "../services/taskService";

const Todo: React.FC = () => {
const { role, token, email } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);

   
const fetchTasks = async () => {
  try {
    const tasksFromApi = await getAllTasks();
    setTasks(tasksFromApi);
  } catch (error) {
    console.error("Erro ao buscar tasks: ", error);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

  // Função para adicionar task
  const handleAddTask = async (task: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    priority: TaskPriority;
    status: TaskStatus;
    ownerEmail: string;
  }) => {
    if (!token) return;

    try {
      const savedTask = await createTask(task);
      setTasks((prev) => [savedTask, ...prev]);
    } catch (err) {
      console.error("Erro ao criar task:", err);
      alert("Erro ao criar tarefa");
    }
  };

  // Atualiza task localmente e envia para backend
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask.id.toString(), updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Erro ao atualizar task:", error);
      alert("Erro ao atualizar tarefa");
    }
  };
  

  return (
    <main className="todo__container">
      {role !== "EMPLOYEE" && <AddTask onAdd={handleAddTask} />}

      <Board
        tasks={tasks}
        setTasks={setTasks}
        onUpdateTask={handleUpdateTask}
        canEdit={role !== "EMPLOYEE"}
      />
    </main>
  );
};

export default Todo;
