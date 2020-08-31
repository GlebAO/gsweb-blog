import { PostsObjectActionTypes, FETCH_POSTS_FAILURE, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS } from "./types";
import PostModel from "../../types/PostModel";
import { InitialStateType } from "../../reducers/types";
import { BlogServiceInterface } from "../../services/types";

const postsRequested = (): PostsObjectActionTypes => {
    return {
        type: FETCH_POSTS_REQUEST
    };
};

const postsLoaded = (newPosts: PostModel[]): PostsObjectActionTypes => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: newPosts
    };
};

const postsError = (error: Error): PostsObjectActionTypes => {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: error
    };
};

const fetchPosts = (service: BlogServiceInterface) => (dispatch: React.Dispatch<PostsObjectActionTypes>, getState: () => InitialStateType): void => {
    const state = getState();
    const posts = state.postsList.posts;
    if (posts.length > 0) {
        dispatch(postsLoaded(posts))
    } else {
        dispatch(postsRequested());
        service.getPosts()
            .then((data) => dispatch(postsLoaded(data)))
            .catch((err) => dispatch(postsError(err)));
    }
}

const fetchAllPosts = (service: BlogServiceInterface) => (dispatch: React.Dispatch<PostsObjectActionTypes>, getState: () => InitialStateType): void => {
    dispatch(postsRequested());
    service.getAllPosts()
        .then((data) => dispatch(postsLoaded(data)))
        .catch((err) => dispatch(postsError(err)));
}


export { fetchPosts, fetchAllPosts }