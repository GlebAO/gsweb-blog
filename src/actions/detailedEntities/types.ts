import { InitialStateType } from "../../reducers/types";

export const FETCH_DETAILED_ENTITY_REQUEST = 'FETCH_DETAILED_ENTITY_REQUEST'
export const FETCH_DETAILED_ENTITY_SUCCESS = 'FETCH_DETAILED_ENTITY_SUCCESS'
export const FETCH_DETAILED_ENTITY_FAILURE = 'FETCH_DETAILED_ENTITY_FAILURE'

export interface DetailedEntityItemsRequestedAction {
    key: string,
    detailedEntityName: string,
    type: typeof FETCH_DETAILED_ENTITY_REQUEST
}

export interface DetailedEntityItemsLoadedAction<T> {
    key: string,
    detailedEntityName: string,
    type: typeof FETCH_DETAILED_ENTITY_SUCCESS,
    payload: T
}

export interface DetailedEntityItemsErrorAction {
    key: string,
    detailedEntityName: string,
    type: typeof FETCH_DETAILED_ENTITY_FAILURE
    payload: Error
}

export type DetailedEntityItemsObjectActionTypes<T> = DetailedEntityItemsLoadedAction<T> | DetailedEntityItemsRequestedAction | DetailedEntityItemsErrorAction;

export type DetailedEntityItemsFunctionActionTypes<T> = (dispatch: React.Dispatch<DetailedEntityItemsObjectActionTypes<T>>, getState: () => InitialStateType) => void;

export type DetailedEntityItemsActionTypes<T> = DetailedEntityItemsObjectActionTypes<T> | DetailedEntityItemsFunctionActionTypes<T>;