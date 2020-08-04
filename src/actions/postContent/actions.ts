import {
  FETCH_POST_CONTENT_REQUEST,
  FETCH_POST_CONTENT_SUCCESS,
  FETCH_POST_CONTENT_FAILURE,
  PostContentObjectActionTypes,
} from "./types";
import PostModel from "../../types/PostModel";
import { InitialStateType } from "../../reducers/types";
import { BlogServiceInterface } from "../../services/types";

const postContentRequested = (): PostContentObjectActionTypes => {
  return {
    type: FETCH_POST_CONTENT_REQUEST,
  };
};

const postContentLoaded = (
  postContent: PostModel
): PostContentObjectActionTypes => {
  return {
    type: FETCH_POST_CONTENT_SUCCESS,
    payload: postContent,
  };
};

const postContentError = (error: Error): PostContentObjectActionTypes => {
  return {
    type: FETCH_POST_CONTENT_FAILURE,
    payload: error,
  };
};

export const fetchPostBySlug = (
  slug: string,
  service: BlogServiceInterface
) => (
  dispatch: React.Dispatch<PostContentObjectActionTypes>,
  getState: () => InitialStateType
): void => {
  const state = getState();
  const postBySlug = state.postsList.posts.find((post) => post.slug === slug);
  if (postBySlug) {
    dispatch(postContentLoaded(postBySlug));
  } else {
    dispatch(postContentRequested());
    service
      .getPostBySlug(slug)
      .then((data) => dispatch(postContentLoaded(data)))
      .catch((error) => dispatch(postContentError(error)));
  }
};
