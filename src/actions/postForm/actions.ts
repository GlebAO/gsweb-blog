import {
  FETCH_POST_FORM_REQUEST,
  FETCH_POST_FORM_SUCCESS,
  FETCH_POST_FORM_FAILURE,
  CLEAR_FORM,
  PostFormObjectActionTypes,
} from "./types";
import PostModel from "../../types/PostModel";
import { InitialStateType } from "../../reducers/types";
import { BlogServiceInterface } from "../../services/types";
import { PostFormValues } from "../../components/post/post-form/post-form"
import { getErrorObject } from "../../utils/error-utils";

const postFormSaveRequested = (): PostFormObjectActionTypes => {
  return {
    type: FETCH_POST_FORM_REQUEST,
  };
};

const postFormSaved = (
  postContent: PostModel
): PostFormObjectActionTypes => {
  return {
    type: FETCH_POST_FORM_SUCCESS,
    payload: postContent,
  };
};

const postFormSavingError = (error: Error): PostFormObjectActionTypes => {
  return {
    type: FETCH_POST_FORM_FAILURE,
    payload: error,
  };
};

export const postFormClear = (): PostFormObjectActionTypes => {
  return {
    type: CLEAR_FORM,
  }
}

export const createPost = (values: PostFormValues, service: BlogServiceInterface) => (
  dispatch: React.Dispatch<PostFormObjectActionTypes>,
  getState: () => InitialStateType
): void => {
  dispatch(postFormSaveRequested());
  service
    .createPost(values)
    .then((data) => dispatch(postFormSaved(data)))
    .catch((err) => dispatch(postFormSavingError(getErrorObject(err))));
}

export const updatePost = (postId: number, values: PostFormValues, service: BlogServiceInterface) => (
  dispatch: React.Dispatch<PostFormObjectActionTypes>,
  getState: () => InitialStateType
): void => {
  dispatch(postFormSaveRequested());
  service
    .updatePost(postId, values)
    .then((data) => dispatch(postFormSaved(data)))
    .catch((err) => dispatch(postFormSavingError(getErrorObject(err))));
}