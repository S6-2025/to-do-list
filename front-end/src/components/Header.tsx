import { useState } from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
  isHidden?: boolean;
};
const Header: React.FC<HeaderProps> = ({ isHidden = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link to="/" className="links-header"> Home</Link>
          </li>
          <li>
            <Link to="/" className="links-header"> About</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
