import React from "react";
import { logoWhite } from "../../../assets";

const BrandLogoWhite:React.FC<{width: string, height: string}> = ({width, height}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${logoWhite[0]}`}
      role="img"
      dangerouslySetInnerHTML={{ __html: logoWhite[1] }}
      height={height}
      width={width}
    />
  );
};

export default BrandLogoWhite;
