import { EntityState, AppObjectActionsTypes } from "./types";
import {
    FETCH_ENTITY_FAILURE,
    FETCH_ENTITY_REQUEST,
    FETCH_ENTITY_SUCCESS,
    INC_ENTITY_PAGE
} from "../actions/entities/types";
import config from "../config";
//import PostModel from "../types/PostModel"
//import UserModel from "../types/UserModel"

const entityReducer = (state: Record<string, EntityState<any>>, action: AppObjectActionsTypes) => {
    let entityState = undefined;

    switch (action.type) {
        case FETCH_ENTITY_REQUEST:
            entityState = state[action.entityName];
            return {
                ...state,
                [action.entityName]: {
                    items: entityState ? entityState.items : [],
                    total: entityState ? entityState.total : 0,
                    page: entityState ? entityState.page : 1,
                    perPage: config.PER_PAGE,
                    loading: true,
                    error: null,
                }
            };
        case FETCH_ENTITY_SUCCESS:
            entityState = state[action.entityName];
            const [items, total] = action.payload;
            return {
                ...state,
                [action.entityName]: {
                    items: [...entityState.items, ...items],
                    total,
                    page: entityState ? entityState.page : 1,
                    perPage: config.PER_PAGE,
                    loading: false,
                    error: null,
                }
            };
        case FETCH_ENTITY_FAILURE:
            return {
                ...state,
                [action.entityName]: {
                    items: [],
                    total: 0,
                    page: 1,
                    perPage: config.PER_PAGE,
                    loading: false,
                    error: action.payload,
                }
            };
        case INC_ENTITY_PAGE:
            entityState = state[action.entityName];
            return {
                ...state,
                [action.entityName]: {
                    ...entityState,
                    page: entityState.page + 1
                }

            }
        default:
            return state;
    }
};

export default entityReducer;
