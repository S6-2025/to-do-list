import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalWrapper from "./components/ModalWrapper";
import Register from "./pages/Register";
import AppRoutes from "./routes/AppRoutes";
import { Task } from "./utils/TasksTypes";
import { setAuthToken } from "./services/Api";

import "./css/Todo.css";
import "./css/Header.css";
import "./css/Footer.css";
import "./css/Board.css";
import "./css/BoardColumn.css";
import "./css/TaskCard.css";
import "./css/TaskDetail.css";
import "./css/AddTask.css";
import "./css/Login.css";
import "./css/Profile.css";
import "./css/Landing.css";
import "./css/Register.css";
import "./css/ModalWrapper.css";

// 👇 APLIQUE ISSO ANTES DE TUDO
const savedTheme = localStorage.getItem("theme");
document.documentElement.classList.remove("dark", "light");
if (savedTheme === "dark" || savedTheme === "light") {
  document.documentElement.classList.add(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.add(prefersDark ? "dark" : "light");
}

const AppContent: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const token = sessionStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = sessionStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("tasks");
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

  useEffect(() => {
    if (tasks !== null) {
      sessionStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleUpdateTask = (updated: Task) => {
    if (!tasks) return;
    setTasks((prev) =>
      prev!.map((task) => (task.id === updated.id ? updated : task))
    );
  };

  const shouldShowFooter = location.pathname !== "/login";

  return (
    <div className="app-container">
      {/* Header sempre montado, apenas escondido visualmente no /login */}
      <Header isHidden={location.pathname === "/login"} />

      <div className="main-content">
        {tasks !== null && (
          <Routes location={state?.backgroundLocation || location}>
            <Route
              path="/*"
              element={
                <AppRoutes
                  tasks={tasks}
                  setTasks={setTasks}
                  onUpdateTask={handleUpdateTask}
                />
              }
            />
          </Routes>
        )}

        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/register"
              element={
                <ModalWrapper>
                  <Register />
                </ModalWrapper>
              }
            />
          </Routes>
        )}
      </div>

      {shouldShowFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
