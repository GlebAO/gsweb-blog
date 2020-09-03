import { InitialStateType } from "../../reducers/types";

export const FETCH_ENTITY_REQUEST = 'FETCH_ENTITY_REQUEST'
export const FETCH_ENTITY_SUCCESS = 'FETCH_ENTITY_SUCCESS'
export const FETCH_ENTITY_FAILURE = 'FETCH_ENTITY_FAILURE'
export const INC_ENTITY_PAGE = 'INC_ENTITY_PAGE'

export interface EntityItemsShowMoreAction {
    entityName: string,
    type: typeof INC_ENTITY_PAGE
}

export interface EntityItemsRequestedAction {
    entityName: string,
    type: typeof FETCH_ENTITY_REQUEST
}

export interface EntityItemsLoadedAction<T> {
    entityName: string,
    type: typeof FETCH_ENTITY_SUCCESS,
    payload: [ T[], number ]
}

export interface EntityItemsErrorAction {
    entityName: string,
    type: typeof FETCH_ENTITY_FAILURE
    payload: Error
}

export type EntityItemsObjectActionTypes<T> = EntityItemsLoadedAction<T> | EntityItemsRequestedAction | EntityItemsErrorAction | EntityItemsShowMoreAction;

export type EntityItemsFunctionActionTypes<T> = (dispatch: React.Dispatch<EntityItemsObjectActionTypes<T>>, getState: () => InitialStateType) => void;

export type EntityItemsActionTypes<T> = EntityItemsObjectActionTypes<T> | EntityItemsFunctionActionTypes<T>;