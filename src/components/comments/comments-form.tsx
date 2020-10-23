import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Formik, Form } from "formik";
import { string, object, number } from "yup";
import { Button, FormInputHidden, FormTextarea } from "../form";
import { BlogServiceContext } from "../../context";
import { useRequest } from "../../utils/hook-utils";
import { useAppContext } from "../../reducers";
import config from "../../config";
import { manageEntitySuccess } from "../../actions/manageEntity/actions";

interface CommentFormInterface {
  commentableType: string;
  commentableId: number;
  parentId?: number;
  handleCollapse?: () => void;
  content?: string;
  commentId?: number;
}

export interface CommentsFormValuesInterface {
  commentableType: string;
  commentableId: number;
  content: string | undefined;
  parentId: number | undefined;
}

const CommentFormSchema = object().shape({
  content: string()
    .required("Нет содержания")
    .min(2, "Минимум 2 символа")
    .max(255, "Максмум 255 символов"),
  parentId: number(),
});

const CommentsForm: React.FC<CommentFormInterface> = ({
  commentableType,
  commentableId,
  parentId,
  handleCollapse,
  content,
  commentId,
}) => {
  const initialData = useMemo(
    () => ({
      commentableType,
      commentableId,
      content: content,
      parentId,
    }),
    [commentableId, parentId, commentableType, content]
  );

  const { dispatch } = useAppContext();
  const [dataState, setDataState] = useState<CommentsFormValuesInterface>(
    initialData
  );
  const blogService = useContext(BlogServiceContext);

  const disablefirstUpdate = useRef(true);
  
  const useFetchCommentRequest = (values: CommentsFormValuesInterface) => {
    const { content, parentId, commentableId, commentableType } = values;

    const request = useCallback(() => {
      //update
      if (commentId && content) {
        return blogService!.updateComment(commentId, content);
      }
      //create
      return blogService!.createComment({
        content,
        parentId,
        commentableId,
        commentableType,
      });
    }, [content, parentId, commentableId, commentableType]);

    const clbk = useCallback(
      (data) => {
        dispatch(
          manageEntitySuccess(
            config.entities.PUBLIC_COMMENTS_FOR_ENTITY(
              commentableId,
              commentableType
            ),
            config.detailedEntities.COMMENTS,
            data
          )
        );
        handleCollapse && handleCollapse();
      },
      [commentableId, commentableType]
    );

    return useRequest(request, disablefirstUpdate, clbk);
  };

  const submitCommentsForm = (values: CommentsFormValuesInterface) => {
    setDataState({ ...dataState, content: values.content });
  };

  const [state] = useFetchCommentRequest(dataState);

  const { loading } = state; //, data, error

  return (
    <Formik
      initialValues={dataState}
      validationSchema={CommentFormSchema}
      onSubmit={(values) => submitCommentsForm(values)}
    >
      <Form>
        <FormInputHidden name="parentId" />
        <div className="mb-2">
          <FormTextarea
            name="content"
            rows={4}
            placeholder="Ваш комментарий..."
            classes="form-control"
          />
        </div>
        <div className="d-flex">
          <div className="ml-auto">
            {parentId && (
              <button
                type="button"
                disabled={loading}
                onClick={handleCollapse}
                className="btn btn-sm btn-link text-decoration-none mr-2"
              >
                отмена
              </button>
            )}
            <Button
              text="Отправить"
              type="submit"
              block={false}
              sizeLg={false}
              loading={loading}
              buttonType="primary"
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default CommentsForm;
