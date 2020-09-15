import React from "react";
import classNames from "classnames";

interface buttonProps {
  text: string;
  type: "submit" | "reset" | "button";
  loading: boolean;
  block: boolean;
  sizeLg?: boolean;
}

const Button: React.FC<buttonProps> = ({
  text,
  type,
  loading,
  block,
  sizeLg,
}) => {
  const classes = classNames({
    "btn-lg": sizeLg,
    "btn btn-primary": true,
    "btn-block": block,
  });
  return (
    <button className={classes} type={type} disabled={loading}>
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
