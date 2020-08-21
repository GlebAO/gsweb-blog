import React from "react";
import { useField } from "formik";
import FormError from "./form-error";
import { Editor } from '@tinymce/tinymce-react';

interface FormCkeditorProps {
  name: string;
}

const FormEditor: React.FC<FormCkeditorProps> = ({ name }) => {
  const [field, meta] = useField(name);

  const handleEditorChange = (content:string) => {
    field.value = content
    console.log('Content was updated:', content);
  }

  return (
    <>
    <Editor 
    {...field}
    apiKey="xmi3zoq0gkkrtdiee7bcavep4y7v67iw8ftxiklikqfsyhm0"
    initialValue="<p>Текст </p>"
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
    }}
    onEditorChange={handleEditorChange}
  />
   {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
  </>
  );
};

export default FormEditor;
