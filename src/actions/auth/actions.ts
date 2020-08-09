import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  AuthObjectActionTypes,
} from "./types";
import { authPayloadInterface } from "./types";
import { AuthServiceInterface } from "../../services/types";
import { InitialStateType } from "../../reducers/types";
import { SignupFormValues } from "../../pages/signup";

const AuthRequested = (): AuthObjectActionTypes => {
  return {
    type: FETCH_AUTH_REQUEST,
  };
};

const AuthLoaded = (data: authPayloadInterface): AuthObjectActionTypes => {
  return {
    type: FETCH_AUTH_SUCCESS,
    payload: data,
  };
};

const AuthError = (error:Error): AuthObjectActionTypes => {
  return {
    type: FETCH_AUTH_FAILURE,
    payload: error,
  };
};

export const authenticate = (
  service: AuthServiceInterface,
  credentials: SignupFormValues,
  cb: ()=>void
) => (
  dispatch: React.Dispatch<AuthObjectActionTypes>,
  getState: () => InitialStateType
): void => {
  dispatch(AuthRequested());
  service.signup(credentials)
        .then((data) => {
            dispatch(AuthLoaded(data))
            setTimeout(() => {
                cb();
            }, 700);
        })
        .catch((err) => {
            const { error } = err.response.data;
            dispatch(AuthError(error))
        });
};
