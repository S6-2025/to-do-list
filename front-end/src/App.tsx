import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Task } from "./utils/TasksTypes";
import { setAuthToken } from "./services/Api";
import ModalWrapper from "./components/ModalWrapper";
import Register from "./pages/Register";
import React, { useEffect, useState } from "react";

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

import "./css/Register.css";
import "./css/ModalWrapper.css";

const AppContent: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const shouldShowHeader = location.pathname !== "/login";
  const shouldShowFooter = location.pathname !== "/login";
  const token = sessionStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = sessionStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Carrega tasks do sessionStorage no início
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

  // Atualiza o sessionStorage sempre que mudar
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

  return (
    <div className="app-container">
      {shouldShowHeader && <Header />}

      {/* Rotas principais (usa backgroundLocation se estiver abrindo modal) */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>

      {/* Rota de modal (ex: /register) */}
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

      {shouldShowFooter && <Footer />}
      <Header isHidden={location.pathname === "/login"} />
      <div className="main-content">
        {tasks !== null && (
          <AppRoutes
            tasks={tasks}
            setTasks={setTasks}
            onUpdateTask={handleUpdateTask}
          />
        )}
      </div>
      <Footer />
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