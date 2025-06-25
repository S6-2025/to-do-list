import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type HeaderProps = {
  isHidden?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isHidden = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth(); // 👈 pega o token do contexto

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleCadastro = () => {
    navigate("/register", {
      state: { backgroundLocation: location },
    });
  };

  return (
    <header className={`header__container ${isHidden ? "header--hidden" : ""}`}>
      <div className="logo-container-header">
        <Link to={token ? "/todo" : "/landing"} className="logo-header">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#plus" />
          </svg>
          <h1>ToTask</h1>
        </Link>
      </div>

      <div className="links-container-header">
        <ul>
          {!token ? (
            // 🔓 NÃO logado → só mostra Login
            <li>
              <Link to="/login" className="links-header">
                Login
              </Link>
            </li>
            
            
          ) : (
            // 🔐 Logado → mostra Perfil, Cadastrar e Tema
            <>
            <li>
                <Link to="/todo" className="links-header">
                  Tasks
                </Link>
              </li>
              <li>
                <Link to="/profile" className="links-header">
                  Perfil
                </Link>
              </li>
              
              <li>
                <button className="links-header theme" onClick={handleCadastro}>
                  Cadastrar
                </button>
              </li>


            </>
          )}

          
              <li>
                <button onClick={toggleTheme} className="links-header theme">
                  <svg className="header__SVG">
                    <use xlinkHref="/icons.svg#sun-moon" />
                  </svg>
                </button>
              </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
