import { PostFormState, AppObjectActionsTypes } from "./types";
import {
  FETCH_POST_FORM_SUCCESS,
  FETCH_POST_FORM_REQUEST,
  FETCH_POST_FORM_FAILURE,
  CLEAR_FORM,
} from "../actions/postForm/types";

const postFormReducer = (
  state: PostFormState,
  action: AppObjectActionsTypes
):PostFormState => {
  switch (action.type) {
    case CLEAR_FORM:
      return {
        postData: null,
        loading: false,
        error: null,
      };
    case FETCH_POST_FORM_REQUEST:
      return {
        postData: null,
        loading: true,
        error: null,
      };
    case FETCH_POST_FORM_SUCCESS:
      return {
        postData: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_POST_FORM_FAILURE:
      return {
        postData: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postFormReducer;
