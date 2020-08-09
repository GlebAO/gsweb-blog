import React from "react";
import classNames from "classnames";

const FormAlert: React.FC<{ text: string; success: boolean }> = ({
  text,
  success,
}) => {
  const classes = classNames({
    alert: true,
    "alert-success": success,
    "alert-danger": !success,
  });
  return (
    <div className={classes} role="alert">
      {text}
    </div>
  );
};

export default FormAlert;
