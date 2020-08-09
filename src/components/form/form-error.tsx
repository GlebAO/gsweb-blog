import React from "react";

const FormError: React.FC<{ text: string }> = ({ text }) => (
  <div className="text-danger">{text}</div>
);

export default FormError;
