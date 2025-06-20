import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./css/Todo.css";
import "./css/Header.css";
import "./css/Footer.css";
import "./css/Board.css";
import "./css/BoardColumn.css";
import "./css/TaskCard.css";
import "./css/TaskDetail.css";

const AppContent: React.FC = () => {
  const location = useLocation();

  // Corrigindo o nome da variável
  const shouldShowHeader = location.pathname !== "/login";

  // Exemplo: special route pode ser alguma rota específica
  const isSpecialRoute = location.pathname === "/special";

  return (
    <div className="app-container">
      {shouldShowHeader && <Header />}
      <div className="main-content">
        <AppRoutes />
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
