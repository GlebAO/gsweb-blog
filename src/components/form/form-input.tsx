import React from "react";
import { useField } from "formik";
import FormError from "./form-error";

export interface formInputInterfaceProps {
  ariaLabel: string;
  name: string;
  type: string;
  placeholder: string;
}

const FormInput: React.FC<formInputInterfaceProps> = ({
  ariaLabel,
  name,
  type,
  placeholder,
}) => {
  const [field, meta] = useField(name);

  return (
    <>
      <input
        {...field}
        aria-label={ariaLabel}
        name={field.name}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default FormInput;
