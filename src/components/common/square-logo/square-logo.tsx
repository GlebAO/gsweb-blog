import React from "react";
import { squareLogo } from "../../../assets";

const SquareLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${squareLogo[0]}`}
      role="img"
      dangerouslySetInnerHTML={{ __html: squareLogo[1] }}
      height="128"
      width="128"
    />
  );
};

export default SquareLogo;
