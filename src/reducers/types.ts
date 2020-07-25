import PostModel from "../types/PostModel";
import { PostsActionTypes, PostsObjectActionTypes } from "../actions/postsList/types";

export type InitialStateType = {
    postsList: PostState
};

export type PostState = {
    posts: PostModel[],
    loading: boolean,
    error: null | Error
}

export interface MainReducerInterface {
    (pervState: InitialStateType, action: PostsObjectActionTypes): InitialStateType
}

export interface EnhancedStoreInterface<S, A> {
    (reducer: MainReducerInterface, state: S): [S, React.Dispatch<A>]
}

export type AppContextType = {
    state: InitialStateType,
    dispatch: React.Dispatch<PostsActionTypes>
}