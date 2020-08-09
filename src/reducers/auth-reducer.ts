import { AuthState, AppObjectActionsTypes } from "./types";
import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE
} from "../actions/auth/types";

const authReducer = (
  state: AuthState,
  action: AppObjectActionsTypes
):AuthState => {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return {
        requested: true,
        message: "",
        authenticated: false,
        userInfo: {},
        expiresAt: null,
      };
    case FETCH_AUTH_SUCCESS:
      return {
        requested: false,
        message: action.payload.message,
        authenticated: true,
        userInfo: action.payload.userInfo,
        expiresAt: action.payload.expiresAt,
      };
    case FETCH_AUTH_FAILURE:
      return {
        requested: false,
        message: action.payload.message,
        authenticated: false,
        userInfo: {},
        expiresAt: null,
      };
    default:
      return state;
  }
};

export default authReducer;