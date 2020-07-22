import { PostsObjectActionTypes, FETCH_POSTS_FAILURE, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS } from "./types";
import PostModel from "../../types/PostModel";
import { InitialStateType } from "../../reducers/types";

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

const fetchPosts = () => (dispatch: React.Dispatch<PostsObjectActionTypes>, getState: () => InitialStateType): void => {
    dispatch(postsRequested());
    getPosts()
        .then((data) => dispatch(postsLoaded(data)))
        .catch((err) => dispatch(postsError(err)));
}

const getPosts = () => {

    const data: PostModel[] = [
        { id: 1, title: 'first post', content: 'We open a blog first time' },
        { id: 2, title: 'second post', content: 'My second post is better than first' }
    ]

    return new Promise<PostModel[]>((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.75) {
                reject(new Error('Something bad happened'));
            } else {
                resolve(data);
            }
        }, 700);
    });
}

export { fetchPosts }