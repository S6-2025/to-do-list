import React from "react";
import AddTask from "../components/AddTask";
import Board from "../components/Board";
import { Task, TaskStatus } from "../utils/TasksTypes";
import { v4 as uuidv4 } from 'uuid';


type TodoProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onUpdateTask: (updated: Task) => void;
};
 

const Todo: React.FC<TodoProps> = ({ tasks, setTasks, onUpdateTask }) => {
const handleAddTask = (title: string, status: TaskStatus) => {
  const newTask: Task = {
    id: uuidv4(),
    title,
    status,
    assignedTo: "",
    startDate: "",
    endDate: "",
    description: "",
  };
  setTasks((prev) => [newTask, ...prev]);
};


  return (
    <main className="todo__container">
      <AddTask onAdd={handleAddTask} />
      <Board tasks={tasks} setTasks={setTasks} onUpdateTask={onUpdateTask} />
    </main>
  );
};

export default Todo;
