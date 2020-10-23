import { InitialStateType, ResponseError } from "../../reducers/types";

export const MANAGE_ENTITY_REQUEST = 'MANAGE_ENTITY_REQUEST'
export const MANAGE_ENTITY_SUCCESS = 'MANAGE_ENTITY_SUCCESS'
export const MANAGE_ENTITY_FAILURE = 'MANAGE_ENTITY_FAILURE'
export const DELETE_ENTITY_SUCCESS = 'DELETE_ENTITY_SUCCESS'

export interface ManageEntityRequestedAction {
    key: string,
    detailedEntityName: string,
    type: typeof MANAGE_ENTITY_REQUEST
}

export interface ManageEntityLoadedAction<T> {
    key: string,
    detailedEntityName: string,
    type: typeof MANAGE_ENTITY_SUCCESS,
    payload: T
}

export interface ManageEntityErrorAction {
    key: string,
    detailedEntityName: string,
    type: typeof MANAGE_ENTITY_FAILURE
    payload: ResponseError
}

export interface DeleteEntityAction {
    entityName: string,
    itemId: number,
    type: typeof DELETE_ENTITY_SUCCESS
}

export type ManageEntityObjectActionTypes<T> = ManageEntityLoadedAction<T> | ManageEntityRequestedAction | ManageEntityErrorAction | DeleteEntityAction;

export type ManageEntityFunctionActionTypes<T> = (dispatch: React.Dispatch<ManageEntityObjectActionTypes<T>>, getState: () => InitialStateType) => void;

export type ManageEntityActionTypes<T> = ManageEntityObjectActionTypes<T> | ManageEntityFunctionActionTypes<T>;