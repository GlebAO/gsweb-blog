import { InitialStateType } from "../../reducers/types";

export const FETCH_ENTITY_REQUEST = 'FETCH_ENTITY_REQUEST'
export const FETCH_ENTITY_SUCCESS = 'FETCH_ENTITY_SUCCESS'
export const FETCH_ENTITY_FAILURE = 'FETCH_ENTITY_FAILURE'
export const INC_ENTITY_PAGE = 'INC_ENTITY_PAGE'

interface EntityItemsShowMoreAction {
    entityName: string,
    type: typeof INC_ENTITY_PAGE
}

interface EntityItemsRequestedAction {
    entityName: string,
    type: typeof FETCH_ENTITY_REQUEST
}

interface EntityItemsLoadedAction {
    entityName: string,
    type: typeof FETCH_ENTITY_SUCCESS,
    payload: [any[], number]
}

interface EntityItemsErrorAction {
    entityName: string,
    type: typeof FETCH_ENTITY_FAILURE
    payload: Error
}

export type EntityItemsObjectActionTypes = EntityItemsRequestedAction | EntityItemsLoadedAction | EntityItemsErrorAction | EntityItemsShowMoreAction;

export type EntityItemsFunctionActionTypes = (dispatch: React.Dispatch<EntityItemsObjectActionTypes>, getState: () => InitialStateType) => void;

export type EntityItemsActionTypes = EntityItemsObjectActionTypes | EntityItemsFunctionActionTypes;