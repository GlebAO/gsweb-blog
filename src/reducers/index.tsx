import React, { useReducer, useContext } from "react";
import authReducer from "./auth-reducer";
import {
  InitialStateType,
  MainReducerInterface,
  EnhancedStoreInterface,
  AppContextType,
  AppActionsTypes,
} from "./types";
import { UserInfoType, UserRole } from "../types/UserModel";

import postContentReducer from "./post-content-reducer";
import postFormReducer from "./post-form-reducer";
import backendReducer from "./backend-reducer";
import entityReducer from "./entity-reducer";
import detailedEntityReducer from "./detailed-entity-reducer";
import mixedEntitiesReducer from "./mixed-entities-reducer";

const getAuthenticated = () => {
  const auth = localStorage.getItem("authenticated");
  return auth ? true : false;
};

const getUserInfo = (): UserInfoType | {} => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo && userInfo !== "undefined" ? JSON.parse(userInfo) : {};
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
  entities: {},
  detailedEntities: {},
  postContent: { postData: null, loading: false, error: null },
  backend: { sidebarOpened: true },
};

const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
  isAuthenticated: () => false,
  isAdmin: () => false,
  isPostAuthor: () => false,
  getUserInfo: () => ({ sub: null, name: "", email: "", role: UserRole.GUEST }),
});

const mainReducer: MainReducerInterface = (state, action) => {
  const {
    postContent,
    auth,
    postForm,
    backend,
    entities,
    detailedEntities
  } = state;

  const { entityState, detailedEntityState } = mixedEntitiesReducer(entities, detailedEntities, action)

  return {
    auth: authReducer(auth, action),
    postContent: postContentReducer(postContent, action),
    postForm: postFormReducer(postForm, action),
    backend: backendReducer(backend, action),
    entities: entityReducer(entityState, action),
    detailedEntities: detailedEntityReducer(detailedEntityState, action)
  };
};

const useEnhancedReducer: EnhancedStoreInterface<InitialStateType, AppActionsTypes> = (reducerFn, currentState) => {
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
      role: UserRole.GUEST,
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
    return userInfo.role === UserRole.ADMIN;
  };

  const isRedactor = () => {
    const userInfo = getUserInfo();
    return userInfo.role === UserRole.USER;
  };

  const isPostAuthor = (userId: number) => {
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
        isPostAuthor
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useAppContext };
