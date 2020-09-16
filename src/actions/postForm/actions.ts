import {
  FETCH_POST_FORM_REQUEST,
  FETCH_POST_FORM_SUCCESS,
  FETCH_POST_FORM_FAILURE,
  CLEAR_FORM,
  PostFormObjectActionTypes,
} from "./types";
import PostModel from "../../types/PostModel";
import { InitialStateType } from "../../reducers/types";
import { getErrorObject } from "../../utils/error-utils";

const postFormSaveRequested = (): PostFormObjectActionTypes => {
  return {
    type: FETCH_POST_FORM_REQUEST,
  };
};

export const postFormClear = (): PostFormObjectActionTypes => {
  return {
    type: CLEAR_FORM,
  }
}

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

export const fetchPost = (endpoint: ()=>Promise<any>) => (
  dispatch: React.Dispatch<PostFormObjectActionTypes>,
  getState: () => InitialStateType
): void => {
  dispatch(postFormSaveRequested());
  endpoint()
    .then((data) => dispatch(postFormSaved(data)))
    .catch((err) => dispatch(postFormSavingError(getErrorObject(err))));
}