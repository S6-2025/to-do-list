import React from "react";
import AddTask from "../components/AddTask";
import Board from "../components/Board";
import { Task, TaskStatus, TaskPriority } from "../utils/TasksTypes";
import { useAuth } from "../context/AuthContext";
import { createTask } from "../services/taskService";

type TodoProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onUpdateTask: (updated: Task) => void;
};

const Todo: React.FC<TodoProps> = ({ tasks, setTasks, onUpdateTask }) => {
  const { role, token } = useAuth();
console.log("Current user role:", role);

  const handleAddTask = async (task: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    priority: TaskPriority;
    status: TaskStatus;
    ownerEmail: string;
  }) => {
    try {
      if (!token) return;

      // Aqui você deixa o backend verificar role via token,
      // e recebe ownerEmail do objeto task para definir o dono da task
      const savedTask = await createTask(task);
      setTasks((prev) => [savedTask, ...prev]);
    } catch (err) {
      console.error("Erro ao criar task:", err);
      alert("Erro ao criar tarefa");
    }
  };

  return (
    <main className="todo__container">
      {/* Só mostra AddTask para PO e SM */}
      {role !== "EMPLOYEE" && <AddTask onAdd={handleAddTask} />}

      {/* Passa prop para Board informar se usuário pode editar */}
      <Board
        tasks={tasks}
        setTasks={setTasks}
        onUpdateTask={onUpdateTask}
        canEdit={role !== "EMPLOYEE"}
      />
    </main>
  );
};

export default Todo;
