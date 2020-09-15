import React, { useContext, useLayoutEffect, useCallback } from "react";
import { Form, Formik } from "formik";
import {
  FormInput,
  Button,
  FormAlert,
  TagsInput,
} from "../../../components/form";
import { string, object } from "yup";
import { FormTextarea } from "../../form";
import { useAppContext } from "../../../reducers";
import {
  createPost,
  updatePost,
  postFormClear,
} from "../../../actions/postForm/actions";
import { BlogServiceContext } from "../../../context";
import { PostStatus } from "../../../types/PostModel";

import "./post-form.scss";
import TagModel from "../../../types/TagModel";

export interface PostFormValues {
  title: string;
  slug: string;
  content: string;
  status?: PostStatus;
  tags?: string[];
}

const PostFormSchema = object().shape({
  title: string()
    .trim()
    .required("Укажите заголовок поста")
    .min(2, "Минимум 2 символа")
    .max(150, "Слишком длинное название"),
  slug: string()
    .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, "Неверный формат URL")
    .trim()
    .lowercase()
    .required("Укажите url для поста")
    .min(2, "Минимум 2 символа")
    .max(150, "Слишком длиннaz ccskrf"),
  content: string()
    .required("Пост без содержания")
    .min(50, "Минимум 50 символов"),
});

interface PostFormProps {
  initialValues?: {
    id: number;
    title: string;
    slug: string;
    content: string;
    tags?: TagModel[];
  };
}

const PostForm: React.FC<PostFormProps> = ({ initialValues }) => {
  const { state, dispatch } = useAppContext();
  const blogServiceContext = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  useLayoutEffect(() => {
    stableDispatch(postFormClear());
  }, [stableDispatch]);

  const { postData, loading, error } = state.postForm;

  const submitPostForm = (values: PostFormValues) => {
    if (blogServiceContext) {
      initialValues && initialValues.id
        ? dispatch(updatePost(initialValues.id, values, blogServiceContext))
        : dispatch(createPost(values, blogServiceContext));
    }
    //console.log(values)
  };

  if (postData) {
    return (
      <FormAlert
        text={
          initialValues
            ? "Запись отредактирована и ожидает модерации"
            : "Запись успешно сохранена и ожидает модерации"
        }
        success={true}
      />
    );
  }

  return (
    <Formik
      initialValues={
        initialValues
          ? {
              ...initialValues,
              tags:
                initialValues.tags &&
                initialValues.tags.map((tag) => tag.title)
            }
          : {
              title: "",
              slug: "",
              content: "",
              tags: [],
            }
      }
      validationSchema={PostFormSchema}
      onSubmit={(values) => submitPostForm(values)}
    >
      {() => (
        <Form>
          {error && <FormAlert text={error.message} success={false} />}
          <div className="px-lg-5 px-3 pt-lg-5 pt-3 mb-3">
            <FormInput
              ariaLabel="Название"
              name="title"
              type="text"
              placeholder="Название"
              classes="gs-post-form-input gs-post-form-title-input"
            />
          </div>
          <div className="px-lg-5 px-3 mb-3">
            <strong>https:/gsweb.ru/post/</strong>
            <FormInput
              ariaLabel="https:/gsweb.ru/post/"
              name="slug"
              type="text"
              placeholder="my-new-post"
              classes="gs-post-form-input gs-post-form-url-input"
            />
          </div>

          <div className="px-lg-5 px-3 mb-3">
            <TagsInput name="tags" />
          </div>

          <div className="px-lg-5 pb-lg-5 p-3 mb-3">
            <FormTextarea
              name="content"
              rows={10}
              placeholder="Напишите здесь что-нибудь интересное..."
              classes="gs-post-form-input gs-post-form-textarea"
            />
          </div>

          <div className="px-lg-5 mb-lg-5 px-3 mb-3">
            <Button
              text="Отправить"
              type="submit"
              loading={loading}
              block={false}
              sizeLg={true}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
