import React from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import { useField } from "formik";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import FormError from "./form-error";

interface HandleEditorChangeInterface {
    html: string;
    text: string;
  }
interface MarkdownEditorInterface {
    name: string
}

const MarkdownEditor: React.FC<MarkdownEditorInterface> = ({ name }) => {
  const [field, meta, helpers] = useField(name);

  const { setValue } = helpers;
  // Register plugins if required
  // MdEditor.use(YOUR_PLUGINS_HERE);

  function handleEditorChange({ html, text }: HandleEditorChangeInterface) {
    setValue(text);
  }

  return (
    <>
      <MdEditor
      value={field.value}
        name={field.name}
        style={{ height: "500px" }}
        renderHTML={(text) => <ReactMarkdown source={text} disallowedTypes={['heading', 'html', 'link']} unwrapDisallowed={true} />}
        onChange={handleEditorChange}
      />
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default MarkdownEditor;
