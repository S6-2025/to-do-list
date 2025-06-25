import React from "react";
import { Routes, Route } from "react-router-dom";

import Todo from "../pages/Todo";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import { Task } from "../utils/TasksTypes";
import Register from"../pages/Register";
import PublicRoute from "./PublicROute";

type AppRoutesProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onUpdateTask: (updatedTask: Task) => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ tasks, setTasks, onUpdateTask }) => {
  return (
    <Routes>
     <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

<Route path="/landing" element={<Landing />} />

<Route
  path="/register"
  element={
    <PrivateRoute>
      <Register />
    </PrivateRoute>
  }
/>

<Route
  path="/todo"
  element={
    <PrivateRoute>
      <Todo />
    </PrivateRoute>
  }
/>

<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>

{/* Catch-all para redirecionar URLs inválidas */}
<Route path="*" element={<Landing />} />

    </Routes>
  );
};

export default AppRoutes;
