import React from "react";
import { Link } from "react-router-dom";
import { BrandLogo } from "../../brand-logo";

import "./header.scss";

const Header = () => {
  return (
    <header className="header mb-2">
      <nav className="navbar bg-white navbar-expand-lg shadow-sm">
        <div className="container">
          <Link to="/" className="nvbar-brand">
            <BrandLogo />
          </Link>
          <div className="navbar-right"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
