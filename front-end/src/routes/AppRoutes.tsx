import React from "react";
import { Routes, Route } from "react-router-dom";

import Todo from "../pages/Todo"
import Login from "../pages/Login";

 
 


const AppRoutes: React.FC = () => {
  return (
    <Routes>

  <Route path="/login" element={<Login />} />
  
  <Route path="/todo" element={<Todo />} />
    
    </Routes>
  );
};

export default AppRoutes;