import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="super-container-header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#book-heart" />
          </svg>
          <h1>Todo List</h1>
        </Link>
      </div>

      <div className="links-container">
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
