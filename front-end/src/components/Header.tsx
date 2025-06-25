import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

type HeaderProps = {
  isHidden?: boolean;
};
const Header: React.FC<HeaderProps> = ({ isHidden = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
        <Link to="/todo" className="logo-header">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#plus" />
          </svg>
          <h1>ToTask</h1>
        </Link>
      </div>

      <div className="links-container-header">
        <ul>
          <li>
            <Link to="/" className="links-header"></Link>
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
          <li>
            <button onClick={toggleTheme} className="links-header theme">
              {" "}
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
