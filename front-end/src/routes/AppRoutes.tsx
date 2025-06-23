import React from "react";
import { Routes, Route } from "react-router-dom";

import Todo from "../pages/Todo";
import Login from "../pages/Login";
import Register from"../pages/Register";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
