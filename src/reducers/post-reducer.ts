import { PostState, AppObjectActionsTypes } from "./types";
import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from "../actions/postsList/types";
import { FETCH_POST_FORM_SUCCESS } from "../actions/postForm/types";

const postReducer = (state: PostState, action: AppObjectActionsTypes):PostState => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        posts: [],
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        posts: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_POSTS_FAILURE:
      return {
        posts: [],
        loading: false,
        error: action.payload,
      };
    //update posts list, when new post created or updated
    case FETCH_POST_FORM_SUCCESS:
      return {
        posts: [],
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default postReducer;
