import UserModel from "../../types/UserModel";
import { InitialStateType } from "../../reducers/types";

export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_REDIRECT = "SET_REDIRECT";
export const AUTH_RESET = "AUTH_RESET";
export const FETCH_SIGNUP_SUCCESS = "FETCH_SIGNUP_SUCCESS";
export const EMAIL_CONFIRMED = "EMAIL_CONFIRMED";

export interface authPayloadInterface {
  message: string;
  userInfo: UserModel;
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
interface AuthResetAction {
  type: typeof AUTH_RESET;
}
interface SignupCompletedAction {
  type: typeof FETCH_SIGNUP_SUCCESS;
  payload: { message: string };
}
interface EmailConfirmedAction {
  type: typeof EMAIL_CONFIRMED;
  payload: { message: string };
}

export type AuthObjectActionTypes =
  | EmailConfirmedAction
  | SignupCompletedAction
  | AuthResetAction
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
