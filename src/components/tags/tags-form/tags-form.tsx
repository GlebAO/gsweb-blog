import React, { FormEvent, useContext, useState } from "react";
import { BlogServiceContext } from "../../../context";
import TagModel from "../../../types/TagModel";
import { useFormFields } from "../../../utils/hook-utils";
import { FormAlert } from "../../form";

interface ITagsForm {
  tagItem?: TagModel;
  successClbk: () => void;
}

interface ITagsFormInitialState {
  tagTitle?: string;
  tagSlug?: string;
  tagScore?: string;
}

const TagsForm: React.FC<ITagsForm> = ({ tagItem, successClbk }) => {
  const initialState = tagItem
    ? {
        tagTitle: tagItem.title,
        tagSlug: tagItem.slug,
        tagScore: tagItem.score.toString(),
      }
    : {
        tagTitle: "",
        tagSlug: "",
        tagScore: "",
      };

  const [fields, setFieldValue] = useFormFields<ITagsFormInitialState>(
    initialState
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const blogServiceContext = useContext(BlogServiceContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    if (tagItem) {
      try {
        const updatedTag = await blogServiceContext?.updateTag({
          id: tagItem.id,
          title: fields.tagTitle || tagItem.title,
          slug: fields.tagSlug || tagItem.slug,
          score: Number(fields.tagScore) || tagItem.score,
        });
        if(updatedTag) {
            successClbk();
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setSending(false);
      }
    }
  }

  function handleFieldChange(event: { target: HTMLInputElement }) {
    setFieldValue(event);
  }

  return (
    <>
      {error && <FormAlert success={false} text={error} />}
      <form onSubmit={handleSubmit} className="tags-form">
        <div className="mb-3">
          <label htmlFor="tagTitle" className="form-label">
            Название
          </label>
          <input
            name="tagTitle"
            id="tagTitle"
            type="text"
            className="form-control"
            value={fields.tagTitle}
            onChange={handleFieldChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tagSlug" className="form-label">
            Ссылка
          </label>
          <input
            name="tagSlug"
            id="tagSlug"
            type="text"
            className="form-control"
            value={fields.tagSlug}
            onChange={handleFieldChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tagScore" className="form-label">
            Рейтинг
          </label>
          <input
            name="tagScore"
            id="tagScore"
            type="text"
            className="form-control"
            value={fields.tagScore}
            onChange={handleFieldChange}
          />
        </div>
        <div className="d-flex align-items-end justify-content-end">
          <button type="submit" className="btn btn-success" disabled={sending}>
            Сохранить
          </button>
        </div>
      </form>
    </>
  );
};

export default TagsForm;
