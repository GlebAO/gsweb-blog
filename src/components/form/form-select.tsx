import React from "react";
import { useField } from "formik";
import FormError from "./form-error";

interface FormSelectProps {
  name: string;
  prompt: string;
  items: { value: number; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({ name, items, prompt }) => {
  const [field, meta] = useField(name);

  return (
    <>
      <select name={field.name}>
        <option value="" label={prompt} />
        {items.map((item) => (
          <option key={item.value} value={item.value} label={item.label} />
        ))}
      </select>
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default FormSelect;
