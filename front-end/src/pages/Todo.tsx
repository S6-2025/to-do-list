import React, { useState } from "react";
import AddTask from "../components/AddTask";
import Board from "../components/Board";
import { Task } from "../utils/TasksTypes";

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      assignedTo: "",
      status: "backlog",
      startDate: "",
      endDate: "",
      description: ""
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  return (
    <main className="todo__container">
      <AddTask onAdd={handleAddTask} />
      <Board tasks={tasks} setTasks={setTasks} onUpdateTask={handleUpdateTask} />
    </main>
  );
};

export default Todo;
