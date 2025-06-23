import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalWrapper from "./components/ModalWrapper";
import Register from "./pages/Register";

import "./css/Todo.css";
import "./css/Header.css";
import "./css/Footer.css";
import "./css/Login.css";
import "./css/Register.css";
import "./css/ModalWrapper.css";

const AppContent: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const shouldShowHeader = location.pathname !== "/login";
  const shouldShowFooter = location.pathname !== "/login";

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