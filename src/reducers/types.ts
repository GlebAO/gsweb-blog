import PostModel from "../types/PostModel";

export type InitialStateType = {
    postsList: PostState;
};

export type PostState = {
    posts: PostModel[],
    loading: boolean,
    error: null | Error
}