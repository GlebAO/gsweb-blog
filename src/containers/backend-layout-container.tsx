import React from "react";
import { ContentContainer } from ".";
import BackendHeader from "../components/backend/header";
import Sidebar from "../components/backend/sidebar";

import "./backend-layout-container.scss";

const BackendLayoutContainer = () => {
  return (
    <div className="app">
      <div className="d-flex flex-row">
        <Sidebar />
        <main className="c-wrapper">
          <BackendHeader />
          <div className="c-body">
            <main className="c-main">
            <div className="container-fluid">
              <ContentContainer />
            </div>
            </main>
          </div>
        </main>
      </div>
      
    </div>
  );
};

export default BackendLayoutContainer;
