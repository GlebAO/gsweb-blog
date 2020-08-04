import { PostContentState, AppObjectActionsTypes } from "./types";
import {
  FETCH_POST_CONTENT_SUCCESS,
  FETCH_POST_CONTENT_REQUEST,
  FETCH_POST_CONTENT_FAILURE,
} from "../actions/postContent/types";

const postContentReducer = (
  state: PostContentState,
  action: AppObjectActionsTypes
):PostContentState => {
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
    default:
      return state;
  }
};

export default postContentReducer;
