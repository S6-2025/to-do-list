import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" header__container">
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
