import React from "react";
import { useField } from "formik";
import FormError from "./form-error";

interface TextareaProps {
  name: string;
  rows: number;
  placeholder: string;
}

const FormTextarea: React.FC<TextareaProps> = ({ name, rows, placeholder }) => {
  const [field, meta] = useField(name);

  return (
    <>
      <textarea
        {...field}
        name={field.name}
        rows={rows}
        placeholder={placeholder}
        className="form-control"
      />
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default FormTextarea;
