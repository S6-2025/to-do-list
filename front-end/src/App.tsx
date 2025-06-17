
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, useLocation } from "react-router-dom";

import Footer from "./components/Footer"; 
import "./css/Todo.css";

const AppContent: React.FC = () => {
  const location = useLocation();

  // Corrigindo o nome da variável
  const shouldShowHeader = location.pathname !== "/login";

  // Exemplo: special route pode ser alguma rota específica
  const isSpecialRoute = location.pathname === "/special";

  return (
    <div className="app-container">
      {shouldShowHeader && <Header />}
      <AppRoutes />
      <Footer specialColor={isSpecialRoute} />
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
