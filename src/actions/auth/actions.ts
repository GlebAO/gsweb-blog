import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  AUTH_LOGOUT,
  SET_REDIRECT,
  AuthObjectActionTypes,
} from "./types";
import { authPayloadInterface } from "./types";
import { AuthServiceInterface } from "../../services/types";
import { InitialStateType } from "../../reducers/types";
import { SignupFormValues } from "../../pages/auth/signup";
import { LoginFormValues } from "../../pages/auth/login";
import { getErrorObject } from "../../utils/error-utils";

const AuthRequested = (): AuthObjectActionTypes => {
  return {
    type: FETCH_AUTH_REQUEST,
  };
};

const setRedirect = (): AuthObjectActionTypes => {
  return {
    type: SET_REDIRECT
  }
}

const AuthLoaded = (data: authPayloadInterface): AuthObjectActionTypes => {
  const { userInfo, expiresAt } = data;
  localStorage.setItem("authenticated", "true");
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  localStorage.setItem("expiresAt", expiresAt.toString());
  return {
    type: FETCH_AUTH_SUCCESS,
    payload: data,
  };
};

const AuthError = (error: Error): AuthObjectActionTypes => {
  return {
    type: FETCH_AUTH_FAILURE,
    payload: error,
  };
};

export const logout = (): AuthObjectActionTypes => {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("expiresAt");
  return {
    type: AUTH_LOGOUT
  }
}

export const login = (service: AuthServiceInterface,
  credentials: LoginFormValues) => (
    dispatch: React.Dispatch<AuthObjectActionTypes>,
    getState: () => InitialStateType
  ): void => {
    dispatch(AuthRequested());
    service
    .login(credentials)
    .then((data) => {
      dispatch(AuthLoaded(data));
      setTimeout(() => {
        dispatch(setRedirect());
      }, 700);
    })
    .catch((err) => {
        dispatch(AuthError(getErrorObject(err)));   
    });
  }

export const authenticate = (
  service: AuthServiceInterface,
  credentials: SignupFormValues
) => (
  dispatch: React.Dispatch<AuthObjectActionTypes>,
  getState: () => InitialStateType
): void => {
  dispatch(AuthRequested());
  service
    .signup(credentials)
    .then((data) => {
      dispatch(AuthLoaded(data));
      setTimeout(() => {
        dispatch(setRedirect());
      }, 700);
    })
    .catch((err) => {
      dispatch(AuthError(typeof err.response.data === "object" ? err.response.data.error : err)); 
    });
};
