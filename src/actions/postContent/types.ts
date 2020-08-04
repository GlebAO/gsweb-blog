import PostModel from "../../types/PostModel"
import { InitialStateType } from "../../reducers/types";

export const FETCH_POST_CONTENT_REQUEST = 'FETCH_POST_CONTENT_REQUEST'
export const FETCH_POST_CONTENT_SUCCESS = 'FETCH_POST_CONTENT_SUCCESS'
export const FETCH_POST_CONTENT_FAILURE = 'FETCH_POST_CONTENT_FAILURE'

interface PostContentRequestedAction {
    type: typeof FETCH_POST_CONTENT_REQUEST
}
interface PostContentLoadedAction {
    type: typeof FETCH_POST_CONTENT_SUCCESS,
    payload: PostModel
}
interface PostContentErrorAction {
    type: typeof FETCH_POST_CONTENT_FAILURE
    payload: Error
}

export type PostContentObjectActionTypes = PostContentRequestedAction | PostContentLoadedAction | PostContentErrorAction;

export type PostContentFunctionActionTypes = (dispatch: React.Dispatch<PostContentObjectActionTypes>, getState: () => InitialStateType) => void;

export type PostsContentActionTypes = PostContentObjectActionTypes | PostContentFunctionActionTypes;