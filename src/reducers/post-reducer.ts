import { PostState } from "./types";
import { PostsObjectActionTypes, FETCH_POSTS_FAILURE, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS} from "../actions/postsList/types";

const postReducer = (state: PostState, action: PostsObjectActionTypes) => {
  //console.log('postReducer', state, 'action', action.type )
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        posts: [],
        loading: true,
        error: null
      };
    case FETCH_POSTS_SUCCESS:
      return {
        posts: action.payload,
        loading: false,
        error: null
      };
    case FETCH_POSTS_FAILURE:
      return {
        posts: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;