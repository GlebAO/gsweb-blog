import React from "react";
import { logo } from "../../../assets";

const BrandLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${logo[0]}`}
      role="img"
      dangerouslySetInnerHTML={{ __html: logo[1] }}
      height="45"
      width="90"
    />
  );
};

export default BrandLogo;
