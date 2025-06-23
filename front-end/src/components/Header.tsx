import { useState } from "react";
import { Link,useNavigate, useLocation } from "react-router-dom";
type HeaderProps = {
  isHidden?: boolean;
};
const Header: React.FC<HeaderProps> = ({ isHidden = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCadastro = () => {
    navigate("/register", {
      state: { backgroundLocation: location },
    });
  };
  return (
    <header className={`header__container ${isHidden ? "header--hidden" : ""}`}>
      <div className="logo-container-header">
        <Link to="/" className="logo-header">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#plus" />
          </svg>
          <h1>ToTask</h1>
        </Link>
      </div>

      <div className="links-container-header">
        <ul>
          <li>
            <Link to="/" className="links-header"> Home</Link>
          </li>
          <li>
            <Link to="/" className="links-header"> About</Link>
          </li>
          <li>
            <button className="links-header-button" onClick={handleCadastro}>Cadastrar</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
