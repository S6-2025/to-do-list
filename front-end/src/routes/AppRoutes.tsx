import React from "react";
import { Routes, Route } from "react-router-dom";

import Todo from "../pages/Todo";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
// import Profile from "../pages/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import { Task } from "../utils/TasksTypes";

type AppRoutesProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onUpdateTask: (updatedTask: Task) => void;
};
import Register from"../pages/Register";

const AppRoutes: React.FC<AppRoutesProps> = ({ tasks, setTasks, onUpdateTask }) => {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/landing" element={<Landing />} />
      <Route
        path="/todo"
        element={<Todo tasks={tasks} setTasks={setTasks} onUpdateTask={onUpdateTask} />}
      />
    </Routes>
  );
};

export default AppRoutes;
