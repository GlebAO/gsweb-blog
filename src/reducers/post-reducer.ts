import { PostState, AppObjectActionsTypes } from "./types";
import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  INC_POSTS_PAGE
} from "../actions/postsList/types";
import { FETCH_POST_FORM_SUCCESS } from "../actions/postForm/types";
import config from "../config";

const postReducer = (state: PostState, action: AppObjectActionsTypes):PostState => {
  switch (action.type) {
    case INC_POSTS_PAGE:
      return {
        ...state,
        page: ++state.page
      }
    case FETCH_POSTS_REQUEST:
      return {
        posts: state.posts,
        total: 0,
        page: state.page,
        perPage: config.PER_PAGE,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      const { posts, total } = action.payload;
      return {
        posts: [...state.posts, ...posts],
        total,
        page: state.page,
        perPage: config.PER_PAGE,
        loading: false,
        error: null,
      };
    case FETCH_POSTS_FAILURE:
      return {
        posts: [],
        total: 0,
        page: 1,
        perPage: config.PER_PAGE,
        loading: false,
        error: action.payload,
      };
    //update posts list, when new post created or updated
    case FETCH_POST_FORM_SUCCESS:
      return {
        posts: [],
        total: 0,
        page: 1,
        perPage: config.PER_PAGE,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default postReducer;
