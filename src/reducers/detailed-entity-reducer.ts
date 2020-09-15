import { DetailedEntityState, AppObjectActionsTypes } from "./types";
import {
    FETCH_DETAILED_ENTITY_FAILURE,
    FETCH_DETAILED_ENTITY_REQUEST,
    FETCH_DETAILED_ENTITY_SUCCESS,
} from "../actions/detailedEntities/types";

const entityReducer = (state: Record<string, DetailedEntityState<any>>, action: AppObjectActionsTypes) => {
    switch (action.type) {
        case FETCH_DETAILED_ENTITY_REQUEST:
            return {
                ...state,
                [action.detailedEntityName]: [{
                    key: null,
                    item: {},
                    loading: true,
                    error: null,
                }]
            };
        case FETCH_DETAILED_ENTITY_SUCCESS:
            return {
                ...state,
                [action.detailedEntityName]: [{
                    key: 'slug' in action.payload ? action.payload.slug : action.payload.id, // If slug in model use slug or use id. It's good???
                    item: action.payload,
                    loading: false,
                    error: null,
                }]
            };
        case FETCH_DETAILED_ENTITY_FAILURE:
            return {
                ...state,
                [action.detailedEntityName]: [{
                    key: null,
                    item: {},
                    loading: false,
                    error: action.payload,
                }]
            };
        default:
            return state;
    }
};

export default entityReducer;
