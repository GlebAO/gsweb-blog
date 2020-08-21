import React from "react";

const FormLabel: React.FC<{ name: string }> = ({ name }) => (
  <label className="mb-1">{name}</label>
);

export default FormLabel;
