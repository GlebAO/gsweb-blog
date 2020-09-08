import React from "react";
import { useField } from "formik";
import FormError from "./form-error";

export interface FormInputCheckboxInterfaceProps {
  name: string;
  children: React.ReactNode;
}

const FormCheckbox: React.FC<FormInputCheckboxInterfaceProps> = ({ name, children }) => {
  const [field, meta] = useField(name);

  return (
    <div className="form-check">
      <input
        {...field}
        className="form-check-input"
        checked={field.value}
        id={field.name}
        name={field.name}
        type="checkbox"
      />
      <label className="form-check-label" htmlFor={field.name}>
        {children}
      </label>
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </div>
  );
};

export default FormCheckbox;
