import React from "react";
import { Link } from "react-router-dom";
import AvatarDropdown from "../../common/avatar-dropdown";
import BrandLogoWhite from "../../common/brand-logo-white"

import "./backend-header.scss";

const BackendHeader = () => {
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="col-md-3 col-lg-2 mr-0 px-2 pb-1" to="/backend">
        <BrandLogoWhite width="80" height="35"/>
      </Link>
      <div className="d-md-none mr-auto pl-1 d-flex align-items-center">
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <input
        className="d-none d-lg-block form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <div className="px-3 d-flex align-items-center">
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default BackendHeader;
