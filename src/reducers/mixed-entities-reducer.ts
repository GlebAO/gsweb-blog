import { DetailedEntityState, EntityState, AppObjectActionsTypes } from "./types";
import {
    FETCH_POST_FORM_SUCCESS
} from "../actions/postForm/types";
import PostModel, { PostStatus } from "../types/PostModel";
import { AUTH_LOGOUT } from "../actions/auth/types";
import config from "../config";


const editAllPostEntities = (state: Record<string, EntityState<PostModel>>, entity: PostModel) => {
    let publicPosts = editEntities(config.entities.OWN_POSTS, state, entity);
    
    if(entity.status === PostStatus.ACTIVE){
        publicPosts = editEntities(config.entities.PUBLIC_POSTS, publicPosts, entity);
        if (entity.tags) {
            // console.log(entity.tags.slice(0,5))
            for (let tag of entity.tags.slice(0, 10)) { //update only 10 tag pages for performance reasons
                publicPosts = editEntities(config.entities.PUBLIC_POSTS_FOR_TAG(tag.slug), publicPosts, entity);
            }
        }
    }
    
    return publicPosts;
}

const editEntities = (key: string, state: Record<string, EntityState<PostModel>>, entity: PostModel) => {
    if (state[key] === undefined || state[key].items === undefined) {
        return state;
    }

    const { [key]: { items } } = state;
    const idx = items.findIndex(item => item.id === entity.id);

    return {
        ...state,
        [key]: {
            ...state[key],
            items: manageEntity<PostModel>(idx, entity, items)
        }
    }
}

function updateEntity<T>(idx: number, item: T, items: T[]): T[] {
    return [...items.slice(0, idx),
        item,
    ...items.slice(idx + 1)]
}
function addEntity<T>(idx: number, item: T, items: T[]): T[] {
    return [item, ...items]
}
function manageEntity<T>(idx: number, item: T, items: T[]): T[] {
    if(idx === -1) {
        return addEntity<T>(idx, item, items)
    }
    return updateEntity<T>(idx, item, items)
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
        case AUTH_LOGOUT:
            return {
                entityState: {},
                detailedEntityState: {}
            }
        case FETCH_POST_FORM_SUCCESS:
            return {
                entityState: editAllPostEntities(entityState, action.payload),
                detailedEntityState: editDetailedEntities(detailedEntityState, action.payload)
            };
        default:
            return { entityState, detailedEntityState }
    }
};

export default entityReducer;
