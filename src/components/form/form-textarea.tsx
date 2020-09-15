import React from "react";
import { useField } from "formik";
import FormError from "./form-error";

interface TextareaProps {
  name: string;
  rows: number;
  placeholder: string;
  classes?: string;
}

const FormTextarea: React.FC<TextareaProps> = ({ name, rows, placeholder, classes }) => {
  const [field, meta] = useField(name);

  return (
    <>
      <textarea
        {...field}
        name={field.name}
        rows={rows}
        placeholder={placeholder}
        className={classes}
      />
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default FormTextarea;
