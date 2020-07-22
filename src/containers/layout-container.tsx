import React from "react";
import { HeaderContainer, ContentContainer, FooterContainer } from ".";

const LayoutContainer = () => {
  return (
    <div className="app">
      <HeaderContainer />
      <div className="body">
        <ContentContainer />
      </div>
      <FooterContainer />
    </div>
  );
};

export default LayoutContainer;
