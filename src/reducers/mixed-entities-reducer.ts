import { DetailedEntityState, EntityState, AppObjectActionsTypes, EntitiesTypes } from "./types";
import {
    FETCH_POST_FORM_SUCCESS
} from "../actions/postForm/types";
import PostModel, { PostStatus } from "../types/PostModel";
import { AUTH_LOGOUT } from "../actions/auth/types";
import config from "../config";
import { DELETE_ENTITY_SUCCESS, ManageEntityLoadedAction, MANAGE_ENTITY_SUCCESS } from "../actions/manageEntity/types";
import CommentModel from "../types/CommentModel";

type Handler = <T>(idx: number, entity: T, items: T[]) => T[]

const editAllPostEntities = (state: Record<string, EntityState<PostModel>>, entity: PostModel) => {
    let publicPosts = editEntities<PostModel>(config.entities.OWN_POSTS, state, entity, manageEntity);

    //for public posts we edit or add post when it active and delete from public lists when status draft or on moderation
    publicPosts = editEntities<PostModel>(config.entities.PUBLIC_POSTS, publicPosts, entity, entity.status === PostStatus.ACTIVE ? manageEntity : deleteEntity);
    if (entity.tags) {
        // console.log(entity.tags.slice(0,5))
        for (let tag of entity.tags.slice(0, 10)) { //update only 10 tag pages for performance reasons
            publicPosts = editEntities<PostModel>(config.entities.PUBLIC_POSTS_FOR_TAG(tag.slug), publicPosts, entity, entity.status === PostStatus.ACTIVE ? manageEntity : deleteEntity);
        }
    }

    return publicPosts;
}

function editEntities<T extends { id: number }>(key: string, state: Record<string, EntityState<T>>, entity: T | undefined, action: Handler) {
    if (!entity || state[key] === undefined || state[key].items === undefined) {
        return state;
    }

    const { [key]: { items } } = state;

    const idx = items.findIndex(item => item.id === entity.id);

    return {
        ...state,
        [key]: {
            ...state[key],
            items: action<T>(idx, entity, items)
        }
    }
}
function deleteEntityByTypeAndItemId<T extends { id: number }>(key: string, entityId: number, state: Record<string, EntityState<T>>) {
    if (state[key] === undefined || state[key].items === undefined) {
        return state;
    }

    const { [key]: { items } } = state;

    const idx = items.findIndex(item => item.id === entityId);
    if (idx === -1) {
        return state;
    }

    return {
        ...state,
        [key]: {
            ...state[key],
            items: [...items.slice(0, idx), ...items.slice(idx + 1)]
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
    if (idx === -1) {
        return addEntity<T>(idx, item, items)
    }
    return updateEntity<T>(idx, item, items)
}
function deleteEntity<T>(idx: number, item: T, items: T[]): T[] {
    if (idx === -1) {
        return items;
    }
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
}
function getCommentPayload(action: ManageEntityLoadedAction<EntitiesTypes>){
    if(action.detailedEntityName === config.detailedEntities.COMMENTS) {
        return action.payload as CommentModel
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

const mixedEntityReducer = (entityState: Record<string, EntityState<any>>, detailedEntityState: Record<string, DetailedEntityState<any>>, action: AppObjectActionsTypes) => {
    switch (action.type) {
        case AUTH_LOGOUT:
            return {
                entityState: {},
                detailedEntityState: {}
            }
        case MANAGE_ENTITY_SUCCESS:
            //console.log('MANAGE_ENTITY_SUCCESS', action)
            //console.log('PAYLOAD: ', getPayload(action))
            return {
                entityState: editEntities<CommentModel>(action.key, entityState, getCommentPayload(action), manageEntity),
                detailedEntityState
            };
        case DELETE_ENTITY_SUCCESS:
            //console.log(action);
            return {
                entityState: deleteEntityByTypeAndItemId<CommentModel>(action.entityName, action.itemId, entityState),
                detailedEntityState
            };
        case FETCH_POST_FORM_SUCCESS:
            return {
                entityState: editAllPostEntities(entityState, action.payload),
                detailedEntityState: editDetailedEntities(detailedEntityState, action.payload)
            }
        default:
            return { entityState, detailedEntityState }
    }
};

export default mixedEntityReducer;
