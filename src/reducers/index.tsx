import React, { useReducer } from "react";
import postReducer from "./post-reducer";
import { InitialStateType } from "./types";
import { PostsActionTypes, PostsObjectActionTypes, PostsFunctionActionTypes } from "../actions/postsList/types";

const initialState: InitialStateType = {
  postsList: { posts: [], loading: false, error: null },
};

interface MainReducerInterface {
  (pervState: InitialStateType, action: PostsObjectActionTypes):InitialStateType
}

interface EnhancedStoreInterface<S, A> {
  (reducer: MainReducerInterface, state: S): [S, React.Dispatch<A>]
}

type AppContextType = {
  state: InitialStateType,
  dispatch: React.Dispatch<PostsActionTypes>
}

const AppContext = React.createContext<AppContextType>({ state: initialState, dispatch: () => null, });

const mainReducer:MainReducerInterface = ({ postsList }, action) => ({
  postsList: postReducer(postsList, action),
});

const useEnhancedReducer:EnhancedStoreInterface<InitialStateType, PostsActionTypes> = ( reducerFn, initialState ) => {
  const [state, originalDispatch] = useReducer(reducerFn, initialState);

  const dispatch = (action: PostsObjectActionTypes | PostsFunctionActionTypes) => {
    if(typeof action === 'function') {
      action( originalDispatch, () => state );
    }
    if(typeof action === 'object') {
      originalDispatch(action)
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
