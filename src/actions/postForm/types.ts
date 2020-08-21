import PostModel from "../../types/PostModel"
import { InitialStateType } from "../../reducers/types";

export const CLEAR_FORM = "CLEAR_FORM"
export const FETCH_POST_FORM_REQUEST = 'FETCH_POST_FORM_REQUEST'
export const FETCH_POST_FORM_SUCCESS = 'FETCH_POST_FORM_SUCCESS'
export const FETCH_POST_FORM_FAILURE = 'FETCH_POST_FORM_FAILURE'

interface PostFormClearAction {
    type: typeof CLEAR_FORM;
}
interface PostFormRequestedAction {
    type: typeof FETCH_POST_FORM_REQUEST
}
interface PostFormLoadedAction {
    type: typeof FETCH_POST_FORM_SUCCESS,
    payload: PostModel
}
interface PostFormErrorAction {
    type: typeof FETCH_POST_FORM_FAILURE
    payload: Error
}

export type PostFormObjectActionTypes = PostFormRequestedAction | PostFormLoadedAction | PostFormErrorAction | PostFormClearAction;

export type PostFormFunctionActionTypes = (dispatch: React.Dispatch<PostFormObjectActionTypes>, getState: () => InitialStateType) => void;

export type PostsFormActionTypes = PostFormObjectActionTypes | PostFormFunctionActionTypes;