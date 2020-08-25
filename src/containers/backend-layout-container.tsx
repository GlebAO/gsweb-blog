import React from "react";
import { ContentContainer, FooterContainer } from ".";
import BackendHeader from "../components/backend/header";
import Sidebar from "../components/backend/sidebar";

const BackendLayoutContainer = () => {
  return (
    <div className="app">
      <BackendHeader />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-md-3">
            <ContentContainer />
          </main>
        </div>
      </div>
      <FooterContainer />
    </div>
  );
};

export default BackendLayoutContainer;
