import PostModel from "../types/PostModel";
import { PostsObjectActionTypes, PostsActionTypes } from "../actions/postsList/types";
import { PostContentObjectActionTypes, PostsContentActionTypes } from "../actions/postContent/types";

export type PostState = {
    posts: PostModel[],
    loading: boolean,
    error: null | Error
}

export type PostContentState = {
    postData: null | PostModel,
    loading: boolean,
    error: null | Error
}

export type InitialStateType = {
    postsList: PostState
    postContent: PostContentState
};

export type AppActionsTypes = PostsActionTypes | PostsContentActionTypes;

export type AppObjectActionsTypes = PostsObjectActionTypes | PostContentObjectActionTypes;

export interface MainReducerInterface {
    (pervState: InitialStateType, action: AppObjectActionsTypes): InitialStateType
}

export interface EnhancedStoreInterface<S, A> {
    (reducer: MainReducerInterface, state: S): [S, React.Dispatch<A>]
}

export type AppContextType = {
    state: InitialStateType,
    dispatch: React.Dispatch<AppActionsTypes>
}