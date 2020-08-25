import { PostContentState, AppObjectActionsTypes } from "./types";
import {
  FETCH_POST_CONTENT_SUCCESS,
  FETCH_POST_CONTENT_REQUEST,
  FETCH_POST_CONTENT_FAILURE,
} from "../actions/postContent/types";
import { FETCH_POST_FORM_SUCCESS } from "../actions/postForm/types";

const postContentReducer = (
  state: PostContentState,
  action: AppObjectActionsTypes
): PostContentState => {
  switch (action.type) {
    case FETCH_POST_CONTENT_REQUEST:
      return {
        postData: null,
        loading: true,
        error: null,
      };
    case FETCH_POST_CONTENT_SUCCESS:
      return {
        postData: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_POST_CONTENT_FAILURE:
      return {
        postData: null,
        loading: false,
        error: action.payload,
      };
    //update posts content, when new post created or updated
    case FETCH_POST_FORM_SUCCESS:
      return {
        postData: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default postContentReducer;
