import React, { useReducer, useCallback, useRef } from "react";
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

  console.log("Action:", action, "prevState", state);

  return { postsList: postReducer(postsList, action) };
};

const useEnhancedReducer: EnhancedStoreInterface<
  InitialStateType,
  PostsActionTypes
> = (reducerFn, initialState) => {
  const [state, originalDispatch] = useReducer(reducerFn, initialState);

  const stateRef = useRef(state);

  const dispatch = useCallback(
    (action: PostsObjectActionTypes | PostsFunctionActionTypes) => {
      if (typeof action === "function") {
        action(originalDispatch, () => stateRef.current);
      }
      if (typeof action === "object") {
        originalDispatch(action);
      }
    },
    []
  );

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
