import React from "react";
import AvatarDropdown from "../../common/avatar-dropdown";
import { toggleSidebar } from "../../../actions/backend/actions";
import { useAppContext } from "../../../reducers";

import "./backend-header.scss";

const BackendHeader = () => {
  const { dispatch } = useAppContext();

  const handleToggleButtonClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="navbar backend-navbar navbar-dark sticky-top bg-dark flex-nowrap p-0 shadow-sm">
      <button className="btn toggle-button" type="button" onClick={handleToggleButtonClick}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="px-3 d-flex align-items-center">
        <AvatarDropdown theme="dark" />
      </div>
    </nav>
  );
};

export default BackendHeader;
