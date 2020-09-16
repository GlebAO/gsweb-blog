import { DetailedEntityState, EntityState, AppObjectActionsTypes } from "./types";
import {
    FETCH_POST_FORM_SUCCESS
} from "../actions/postForm/types";
import PostModel from "../types/PostModel";

const editEntities = (state: Record<string, EntityState<PostModel>>, entity: PostModel) => {
    if (state.publicPosts === undefined || state.publicPosts.items === undefined) {
        return state;
    }
    const { publicPosts: { items } } = state;
    const idx = items.findIndex(item => item.id === entity.id);
    if (idx === -1) {
        return state;
    }
    return {
        ...state,
        publicPosts: {
            ...state.publicPosts,
            items: [...items.slice(0, idx),
                entity,
            ...items.slice(idx + 1)]
        }
    }
}

const editDetailedEntities = (state: Record<string, DetailedEntityState<any>>, entity: PostModel) => {
    return {
        ...state,
        posts: {
            ...state.posts, [entity.slug]: {
                item: entity,
                loading: false,
                error: null,
            }
        }
    }
}

const entityReducer = (entityState: Record<string, EntityState<any>>, detailedEntityState: Record<string, DetailedEntityState<any>>, action: AppObjectActionsTypes) => {
    switch (action.type) {
        case FETCH_POST_FORM_SUCCESS:
            return {
                entityState: editEntities(entityState, action.payload),
                detailedEntityState: editDetailedEntities(detailedEntityState, action.payload)
            };
        default:
            return { entityState, detailedEntityState }
    }
};

export default entityReducer;
