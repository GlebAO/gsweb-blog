import UserModel from "../../types/UserModel"
import { InitialStateType } from "../../reducers/types";

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

interface UsersRequestedAction {
    type: typeof FETCH_USERS_REQUEST
}
interface UsersLoadedAction {
    type: typeof FETCH_USERS_SUCCESS,
    payload: UserModel[]
}
interface UsersErrorAction {
    type: typeof FETCH_USERS_FAILURE
    payload: Error
}


export type UsersObjectActionTypes = UsersRequestedAction | UsersLoadedAction | UsersErrorAction;

export type UsersFunctionActionTypes = (dispatch: React.Dispatch<UsersObjectActionTypes>, getState: () => InitialStateType) => void;

export type UsersActionTypes = UsersObjectActionTypes | UsersFunctionActionTypes;