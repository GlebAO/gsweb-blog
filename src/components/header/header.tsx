import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BrandLogo } from "../common/brand-logo";
import { AppContext } from "../../reducers";
import AvatarDropdown from "../common/avatar-dropdown";

import "./header.scss";

const Header = () => {
  const appContext = useContext(AppContext);
  return (
    <header className="header mb-2">
      <nav className="navbar bg-white navbar-expand-lg shadow-sm">
        <div className="container">
          <Link to="/" className="nvbar-brand">
            <BrandLogo />
          </Link>
          <div className="navbar-right">
            {appContext.isAuthenticated() ? (
              <div className="d-flex align-items-center">
                <Link to="/post/create" className="mr-2">Добавить запись</Link>
                <AvatarDropdown />
              </div>
            ) : (
              <div>
                <Link to="/login" className="btn btn-link">
                  Войти
                </Link>
                <Link to="/signup" className="btn btn-outline-primary">
                  Зарегистрироваться
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
