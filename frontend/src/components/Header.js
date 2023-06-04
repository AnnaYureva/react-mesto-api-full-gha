import React from "react";
import Logo from "../images/Logo.svg";
import { Link } from "react-router-dom";

function Header( { email, route, onClick, title }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={Logo} />
      <nav className="header__auth">
        <p className="header__text">{email}</p>
        <Link
          to={route}
          className="header__link"
          type="button"
          onClick={onClick}
        >
          {title}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
