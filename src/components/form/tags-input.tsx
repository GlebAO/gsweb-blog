import React, { useState } from "react";
import FormError from "./form-error";
import { useField } from "formik";

import "./tags-input.scss";

interface TagsInputInterface {
  name: string;
}

const TagsInput: React.FC<TagsInputInterface> = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [tagsInput, setTagsInput] = useState(field.value ? '#'+field.value.join(' #') : '#');
  const [inputError, setInputError] = useState<string | null>(null);

  const { setValue } = helpers;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length === 0) {
      return;
    }

    if (!/^([#а-яА-Яa-zA-Z0-9_ ]+)$/.test(input)) {
      setInputError(
        "Тэг начинается с # и может содержать русские и английские буквы"
      );
      return;
    }

    setInputError(null);

    let result;
    let values = [];
    const regex = new RegExp("#([а-яА-Яa-zA-Z0-9_]*?)( |$)", "g");
    while ((result = regex.exec(input)) !== null) {
      if (result[1] && result[1].length > 1) {
        values.push(result[1]);
      }
      //console.log(`Found ${result[1]}. Next starts at ${regex.lastIndex}.`);
    }
    setTagsInput(input);
    setValue(values);
    //console.log(values);
  };

  return (
    <>
      <input
        value={tagsInput}
        name={name}
        onChange={handleInputChange}
        type="text"
        className="gs-post-form-input gs-tags-input"
        placeholder="Добавьте тэги"
      />
      <p className="text-muted">Тэги начинаются с # и пишутся через пробел.</p>
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
      {inputError ? <FormError text={inputError}></FormError> : null}
    </>
  );
};

export default TagsInput;
