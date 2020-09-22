import React, { useContext, useEffect, useCallback } from "react";
import { Form, Formik } from "formik";
import {
  FormInput,
  Button,
  FormAlert,
  TagsInput,
  MarkdownEditor,
} from "../../../components/form";
import { string, object } from "yup";
import { useAppContext } from "../../../reducers";
import { fetchPost, postFormClear } from "../../../actions/postForm/actions";
import { BlogServiceContext } from "../../../context";
import { PostStatus } from "../../../types/PostModel";
import TagModel from "../../../types/TagModel";
import { Redirect } from "react-router-dom";

import "./post-form.scss";

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
    status: PostStatus.PENDING | PostStatus.DRAFT;
  };
}

const PostForm: React.FC<PostFormProps> = ({ initialValues }) => {
  const { state, dispatch } = useAppContext();
  const blogServiceContext = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    return () => {
      stableDispatch(postFormClear());
    };
  }, [stableDispatch]);

  const { postData, loading, error } = state.postForm;

  const submitPostForm = (values: PostFormValues) => {
    if (blogServiceContext) {
      initialValues && initialValues.id
        ? dispatch(
            fetchPost(() =>
              blogServiceContext.updatePost(initialValues.id, values)
            )
          )
        : dispatch(fetchPost(() => blogServiceContext.createPost(values)));
    }
    //console.log(values)
  };

  if (postData) {
    return <Redirect to={`/post/${postData.slug}`} />;
  }

  return (
    <Formik
      initialValues={
        initialValues
          ? {
              ...initialValues,
              tags:
                initialValues.tags &&
                initialValues.tags.map((tag) => tag.title),
              status: PostStatus.PENDING,
            }
          : {
              title: "",
              slug: "",
              content: "",
              tags: [],
              status: PostStatus.PENDING,
            }
      }
      validationSchema={PostFormSchema}
      onSubmit={(values) => submitPostForm(values)}
    >
      {(props) => {
        const handleDraftClick = () => {
          const { values } = props;
          values.status = PostStatus.DRAFT;
          props.handleSubmit();
        };
        return (
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

            <div className="pb-lg-5 mb-3">
              <div className="post-form-content">
                <MarkdownEditor name="content" />
              </div>
            </div>

            <div className="px-lg-5 mb-lg-5 px-3 mb-3">
              <div className="d-flex">
                <div className="mr-3">
                  <Button
                    text="Опубликовать"
                    type="submit"
                    loading={loading}
                    block={false}
                    sizeLg={true}
                    buttonType="primary"
                  />
                </div>
                <div>
                  <Button
                    text="Сохранить в черновиках"
                    type="button"
                    onClick={handleDraftClick}
                    loading={loading}
                    block={false}
                    sizeLg={true}
                    buttonType="secondary"
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PostForm;
