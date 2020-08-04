import PostModel from "../../types/PostModel"
import { InitialStateType } from "../../reducers/types";

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

interface PostsRequestedAction {
    type: typeof FETCH_POSTS_REQUEST
}
interface PostsLoadedAction {
    type: typeof FETCH_POSTS_SUCCESS,
    payload: PostModel[]
}
interface PostsErrorAction {
    type: typeof FETCH_POSTS_FAILURE
    payload: Error
}

export type PostsObjectActionTypes = PostsRequestedAction | PostsLoadedAction | PostsErrorAction;

export type PostsFunctionActionTypes = (dispatch: React.Dispatch<PostsObjectActionTypes>, getState: () => InitialStateType) => void;

export type PostsActionTypes = PostsObjectActionTypes | PostsFunctionActionTypes;

