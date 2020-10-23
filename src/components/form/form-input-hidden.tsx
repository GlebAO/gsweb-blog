import React from "react";
import { useField } from "formik";

export interface formInputHiddenInterfaceProps {
  name: string;
}

const FormInputHidden: React.FC<formInputHiddenInterfaceProps> = ({
  name,
}) => {
  const [field] = useField(name);

  return (
    <>
      <input
        {...field}
        name={field.name}
        type="hidden"
      />
    </>
  );
};

export default FormInputHidden;
