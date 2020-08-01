import React from "react";
import { HeaderContainer, ContentContainer, FooterContainer } from ".";

const LayoutContainer = () => {
  return (
    <div className="app">
      <HeaderContainer />
      <div className="body">
        <div className="container">
          <ContentContainer />
        </div>
      </div>
      <FooterContainer />
    </div>
  );
};

export default LayoutContainer;
