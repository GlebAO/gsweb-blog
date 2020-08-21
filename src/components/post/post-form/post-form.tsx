import React, { useContext, useLayoutEffect, useCallback } from "react";
import { Form, Formik } from "formik";
import {
  FormInput,
  Button,
  FormLabel,
  FormAlert,
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

export interface PostFormValues {
  title: string;
  slug: string;
  content: string;
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
  initialValues?: { id: number; title: string; slug: string; content: string };
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
          ? initialValues
          : {
              title: "",
              slug: "",
              content: "",
            }
      }
      validationSchema={PostFormSchema}
      onSubmit={(values) => submitPostForm(values)}
    >
      {() => (
        <Form>
          {error && <FormAlert text={error.message} success={false} />}
          <div className="mb-3">
            <FormLabel name="Название" />
            <FormInput
              ariaLabel="Название"
              name="title"
              type="text"
              placeholder="Название"
            />
          </div>
          <div className="mb-3">
            <FormLabel name="Красивый URL" />
            <FormInput
              ariaLabel="Красивый URL"
              name="slug"
              type="text"
              placeholder="my-beautiful-article"
            />
          </div>
          <div className="mb-3">
            <FormLabel name="Содержание" />
            <FormTextarea name="content" rows={10} placeholder="Содержание" />
          </div>

          <div className="mt-3">
            <Button
              text="Отправить"
              type="submit"
              loading={loading}
              block={false}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
