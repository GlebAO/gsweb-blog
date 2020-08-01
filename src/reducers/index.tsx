import React, { useReducer } from "react";
import postReducer from "./post-reducer";
import {
  InitialStateType,
  MainReducerInterface,
  EnhancedStoreInterface,
  AppContextType,
} from "./types";
import {
  PostsActionTypes,
  PostsObjectActionTypes,
  PostsFunctionActionTypes,
} from "../actions/postsList/types";

const initialState: InitialStateType = {
  postsList: { posts: [], loading: false, error: null },
};

const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer: MainReducerInterface = (state, action) => {
  const { postsList } = state;

  return { postsList: postReducer(postsList, action) };
};

const useEnhancedReducer: EnhancedStoreInterface<
  InitialStateType,
  PostsActionTypes
> = (reducerFn, currentState) => {
  const [state, originalDispatch] = useReducer(reducerFn, currentState);

  const dispatch = (
    action: PostsObjectActionTypes | PostsFunctionActionTypes
  ) => {
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
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
