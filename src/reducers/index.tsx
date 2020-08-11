import React, { useReducer } from "react";
import postReducer from "./post-reducer";
import authReducer from "./auth-reducer";
import {
  InitialStateType,
  MainReducerInterface,
  EnhancedStoreInterface,
  AppContextType,
  AppActionsTypes,
} from "./types";
import { UserInfoType } from "../types/UserModel";

import postContentReducer from "./post-content-reducer";

const getAuthenticated = () => {
  const auth = localStorage.getItem("authenticated");
  return auth ? true : false;
};

const getUserInfo = (): UserInfoType | {} => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : {};
};

const getExpiresAt = () => {
  const expiresAt = localStorage.getItem("expiresAt");
  return expiresAt ? parseInt(expiresAt) : null;
};

const initialState: InitialStateType = {
  auth: {
    requested: false,
    message: "",
    authenticated: getAuthenticated(),
    userInfo: getUserInfo(),
    expiresAt: getExpiresAt(),
    setRedirect: getAuthenticated(),
  },
  postsList: { posts: [], loading: false, error: null },
  postContent: { postData: null, loading: false, error: null },
};

const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
  isAuthenticated: () => false,
  getUserInfo: () => ({name:"", email: "", role: ""}),
});

const mainReducer: MainReducerInterface = (state, action) => {
  const { postsList, postContent, auth } = state;

  return {
    auth: authReducer(auth, action),
    postsList: postReducer(postsList, action),
    postContent: postContentReducer(postContent, action),
  };
};

const useEnhancedReducer: EnhancedStoreInterface<
  InitialStateType,
  AppActionsTypes
> = (reducerFn, currentState) => {
  const [state, originalDispatch] = useReducer(reducerFn, currentState);

  const dispatch = (action: AppActionsTypes) => {
    if (typeof action === "function") {
      action(originalDispatch, () => state);
    }
    if (typeof action === "object") {
      originalDispatch(action);
    }
  };

  return [state, dispatch];
};

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useEnhancedReducer(mainReducer, initialState);

  //AUTH HELPERS
  const { auth } = state;
  const isAuthenticated = () => {
    if (!auth.authenticated || !auth.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < auth.expiresAt;
  };
  const getUserInfo = () => {
    const { userInfo } = auth;
    const data = { name: "", email: "", role: "" };
    if ("name" in userInfo) {
      data.name = userInfo.name;
    }
    if ("email" in userInfo) {
      data.email = userInfo.email;
    }
    if ("role" in userInfo) {
      data.role = userInfo.role;
    }
    return data;
  };

  return (
    <AppContext.Provider
      value={{ state, dispatch, isAuthenticated, getUserInfo }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
