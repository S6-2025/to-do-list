import React from "react";
import { Routes, Route } from "react-router-dom";

import Todo from "../pages/Todo";
import Login from "../pages/Login";
import { Task } from "../utils/TasksTypes";

type AppRoutesProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onUpdateTask: (updatedTask: Task) => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ tasks, setTasks, onUpdateTask }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={<Todo tasks={tasks} setTasks={setTasks} onUpdateTask={onUpdateTask} />}
      />
    </Routes>
  );
};

export default AppRoutes;
