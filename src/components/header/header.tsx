import React from "react";
import { Link } from "react-router-dom";
import { BrandLogo } from "../view";

import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar bg-white navbar-expand-lg shadow-sm">
        <div className="container">
          <Link to="/" className="nvbar-brand">
            <BrandLogo />
          </Link>
          <div className="navbar-right"></div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
