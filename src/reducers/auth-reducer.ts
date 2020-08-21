import { AuthState, AppObjectActionsTypes } from "./types";
import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  SET_REDIRECT,
  AUTH_LOGOUT,
} from "../actions/auth/types";

const authReducer = (
  state: AuthState,
  action: AppObjectActionsTypes
): AuthState => {
  switch (action.type) {
    case SET_REDIRECT:
      return {
        ...state,
        message: "",
        setRedirect: true
      }
    case FETCH_AUTH_REQUEST:
      return {
        requested: true,
        message: "",
        authenticated: false,
        userInfo: {},
        expiresAt: null,
        setRedirect: false
      };
    case FETCH_AUTH_SUCCESS:
      const { message, userInfo, expiresAt } = action.payload;
      return {
        requested: false,
        message: message,
        authenticated: true,
        userInfo: userInfo,
        expiresAt: expiresAt,
        setRedirect: false
      };
    case FETCH_AUTH_FAILURE:
      return {
        requested: false,
        message: action.payload.message,
        authenticated: false,
        userInfo: {},
        expiresAt: null,
        setRedirect: false
      };
    case AUTH_LOGOUT:
      return {
        requested: false,
        message: "",
        authenticated: false,
        userInfo: {},
        expiresAt: null,
        setRedirect: false
      };
    default:
      return state;
  }
};

export default authReducer;
