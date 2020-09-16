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
                [action.detailedEntityName]: { ...state[action.detailedEntityName], [action.key]: {
                    item: null,
                    loading: true,
                    error: null,
                }}
            };
        case FETCH_DETAILED_ENTITY_SUCCESS:
            return {
                ...state,
                [action.detailedEntityName]: {...state[action.detailedEntityName], [action.key]: {
                    item: action.payload,
                    loading: false,
                    error: null,
                }}
            };
        case FETCH_DETAILED_ENTITY_FAILURE:
            return {
                ...state,
                [action.detailedEntityName]: {...state[action.detailedEntityName], [action.key]: {
                    item: null,
                    loading: false,
                    error: action.payload,
                }}
            };
        default:
            return state;
    }
};

export default entityReducer;
