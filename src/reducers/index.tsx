import React, { useReducer } from "react";
import postReducer from "./post-reducer";
import { InitialStateType, PostState } from "./types";
import { PostsActionTypes, PostsObjectActionTypes, PostsFunctionActionTypes } from "../actions/postsList/types";

const initialState: InitialStateType = {
  postsList: { posts: [], loading: false, error: null },
};

const AppContext = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<PostsActionTypes>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ postsList }: InitialStateType, action: PostsObjectActionTypes) => ({
  postsList: postReducer(postsList, action),
});

const useEnhancedReducer = (
  reducerFn: (state: InitialStateType, action: PostsObjectActionTypes) => { postsList: PostState }, initialState: InitialStateType): [InitialStateType, React.Dispatch<PostsActionTypes>] => {
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
