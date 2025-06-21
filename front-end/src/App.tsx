import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Task } from "./utils/TasksTypes";

import "./css/Todo.css";
import "./css/Header.css";
import "./css/Footer.css";
import "./css/Board.css";
import "./css/BoardColumn.css";
import "./css/TaskCard.css";
import "./css/TaskDetail.css";
import "./css/AddTask.css";
import React, { useEffect, useState } from "react";

const AppContent: React.FC = () => {
  const location = useLocation();
  const shouldShowHeader = location.pathname !== "/login";

 const [tasks, setTasks] = useState<Task[]>(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});

  // Carrega tasks do localStorage no início
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  }, []);

  // Atualiza o localStorage sempre que mudar
  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleUpdateTask = (updated: Task) => {
    if (!tasks) return;
    setTasks((prev) =>
      prev!.map((task) => (task.id === updated.id ? updated : task))
    );
  };

  return (
    <div className="app-container">
      {shouldShowHeader && <Header />}
      <div className="main-content">
        {tasks !== null && (
          <AppRoutes tasks={tasks} setTasks={setTasks} onUpdateTask={handleUpdateTask} />
        )}
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
