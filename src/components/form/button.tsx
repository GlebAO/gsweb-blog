import React from "react";
import classNames from "classnames";

interface buttonProps {
  text: string;
  type: "submit" | "reset" | "button";
  loading: boolean;
  block: boolean;
  sizeLg?: boolean;
  onClick?: ()=>void;
  buttonType?: string;
}

const Button: React.FC<buttonProps> = ({
  text,
  type,
  loading,
  block,
  sizeLg,
  onClick,
  buttonType
}) => {
  const classes = classNames({
    "btn-lg": sizeLg,
    "btn": true,
    "btn-block": block,
    [`btn-${buttonType}`]: true
  });
  return (
    <button className={classes} type={type} disabled={loading} onClick={onClick}> 
      {loading ? (
        <span className="flex items-center">
          <span className="ml-2">Загружается...</span>
        </span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
