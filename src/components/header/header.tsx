import React from "react";
import { Link } from "react-router-dom";
import { BrandLogo } from "../common/brand-logo";

import "./header.scss";

const Header = () => {
  return (
    <header className="header mb-2">
      <nav className="navbar bg-white navbar-expand-lg shadow-sm">
        <div className="container">
          <Link to="/" className="nvbar-brand">
            <BrandLogo />
          </Link>
          <div className="navbar-right">
            <Link to="/login" className="btn btn-link">
              Войти
            </Link>
            <Link to="/signup" className="btn btn-outline-primary">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
