import { PostsObjectActionTypes, INC_POSTS_PAGE, FETCH_POSTS_FAILURE, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, PostsListsInterface } from "./types";
import { InitialStateType } from "../../reducers/types";
import { BlogServiceInterface } from "../../services/types";

const postsRequested = (): PostsObjectActionTypes => {
    return {
        type: FETCH_POSTS_REQUEST
    };
};

const postsLoaded = (postsList: PostsListsInterface): PostsObjectActionTypes => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: postsList
    };
};

const postsError = (error: Error): PostsObjectActionTypes => {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: error
    };
};

export const postsShowMore = (): PostsObjectActionTypes => {
    return {
        type: INC_POSTS_PAGE,
    };
};

const fetchPosts = (service: BlogServiceInterface, page: number) => (dispatch: React.Dispatch<PostsObjectActionTypes>, getState: () => InitialStateType): void => {
    const state = getState();
    const { page: loadedPage } = state.postsList;
    if (page === 1 || page > loadedPage) {
        dispatch(postsRequested());
        service.getPosts(page)
            .then((data) => dispatch(postsLoaded(data)))
            .catch((err) => dispatch(postsError(err)));
    }


}

const fetchAllPosts = (service: BlogServiceInterface, page: number) => (dispatch: React.Dispatch<PostsObjectActionTypes>, getState: () => InitialStateType): void => {
    const state = getState();
    const { page: loadedPage } = state.postsList;
    if (page === 1 || page > loadedPage) {
        dispatch(postsRequested());
        service.getAllPosts(page)
            .then((data) => dispatch(postsLoaded(data)))
            .catch((err) => dispatch(postsError(err)));
    }
}


export { fetchPosts, fetchAllPosts }