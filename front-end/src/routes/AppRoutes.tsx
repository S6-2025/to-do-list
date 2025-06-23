import React from "react";
import { Routes, Route } from "react-router-dom";

import Todo from "../pages/Todo";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import PrivateRoute from "../routes/PrivateRoute";
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
      <Route path="/landing" element={<Landing />} />

      <Route
        path="/todo"
        element={
          <PrivateRoute allowedRoles={["PO", "SM", "EMPLOYEE"]}>
            <Todo tasks={tasks} setTasks={setTasks} onUpdateTask={onUpdateTask} />
          </PrivateRoute>
        }
      />

      {/* Redirecionar qualquer rota não mapeada para landing */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
};

export default AppRoutes;
