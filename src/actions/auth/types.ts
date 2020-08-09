import { UserInfoType } from "../../types/UserModel";
import { InitialStateType } from "../../reducers/types";

export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE";

export interface authPayloadInterface {
    message: string
    userInfo: UserInfoType
    expiresAt: number
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

export type AuthObjectActionTypes =
  | AuthRequestedAction
  | AuthLoadedAction
  | AuthErrorAction;

export type AuthFunctionActionTypes = (
  dispatch: React.Dispatch<AuthObjectActionTypes>,
  getState: () => InitialStateType
) => void;

export type AuthActionTypes = AuthObjectActionTypes | AuthFunctionActionTypes;
