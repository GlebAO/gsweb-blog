import React, { useReducer, useContext } from "react";
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
import postFormReducer from "./post-form-reducer";

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
  postForm: { postData: null, loading: false, error: null },
  postsList: { posts: [], loading: false, error: null },
  postContent: { postData: null, loading: false, error: null },
};

const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
  isAuthenticated: () => false,
  isAdmin: () => false,
  canEdit: () => false,
  getUserInfo: () => ({ sub: null, name: "", email: "", role: "" }),
});

const mainReducer: MainReducerInterface = (state, action) => {
  const { postsList, postContent, auth, postForm } = state;

  return {
    auth: authReducer(auth, action),
    postsList: postReducer(postsList, action),
    postContent: postContentReducer(postContent, action),
    postForm: postFormReducer( postForm, action)
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
    const data: UserInfoType = {
      sub: null,
      name: "",
      email: "",
      role: "guest",
    };
    if ("sub" in userInfo) {
      data.sub = userInfo.sub;
    }
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

  const isAdmin = () => {
    const userInfo = getUserInfo();
    return userInfo.role === "admin";
  };

  const isRedactor = () => {
    const userInfo = getUserInfo();
    return userInfo.role === "redactor";
  };

  const canEdit = (userId: number) => {
    const userInfo = getUserInfo();
    return (
      isAuthenticated() &&
      (isRedactor() || isAdmin()) &&
      userId === userInfo.sub
    );
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        isAuthenticated,
        getUserInfo,
        isAdmin,
        canEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useAppContext };
