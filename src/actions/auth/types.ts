import { UserInfoType } from "../../types/UserModel";
import { InitialStateType } from "../../reducers/types";

export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_REDIRECT = "SET_REDIRECT";

export interface authPayloadInterface {
  message: string;
  userInfo: UserInfoType;
  expiresAt: number;
}
interface SetRedirectAction {
  type: typeof SET_REDIRECT;
}
interface AuthRequestedAction {
  type: typeof FETCH_AUTH_REQUEST;
}
interface AuthLoadedAction {
  type: typeof FETCH_AUTH_SUCCESS;
  payload: authPayloadInterface;
}
interface AuthErrorAction {
  type: typeof FETCH_AUTH_FAILURE;
  payload: Error;
}
interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

export type AuthObjectActionTypes =
  | AuthRequestedAction
  | AuthLoadedAction
  | AuthErrorAction
  | AuthLogoutAction
  | SetRedirectAction;

export type AuthFunctionActionTypes = (
  dispatch: React.Dispatch<AuthObjectActionTypes>,
  getState: () => InitialStateType
) => void;

export type AuthActionTypes = AuthObjectActionTypes | AuthFunctionActionTypes;
