import PostModel from "../types/PostModel";
import {
  PostsObjectActionTypes,
  PostsActionTypes,
} from "../actions/postsList/types";
import {
  PostContentObjectActionTypes,
  PostsContentActionTypes,
} from "../actions/postContent/types";
import {
  PostFormObjectActionTypes,
  PostsFormActionTypes,
} from "../actions/postForm/types";
import { AuthObjectActionTypes, AuthActionTypes } from "../actions/auth/types";
import { UserInfoType } from "../types/UserModel";

export type PostState = {
  posts: PostModel[];
  loading: boolean;
  error: null | Error;
};

export type PostContentState = {
  postData: null | PostModel;
  loading: boolean;
  error: null | Error;
};

export type PostFormState = {
  postData: null | PostModel;
  loading: boolean;
  error: null | Error;
};

export type AuthState = {
  requested: boolean;
  message: string;
  authenticated: boolean;
  userInfo: UserInfoType | {};
  expiresAt: number | null;
  setRedirect: boolean
};

export type InitialStateType = {
  auth: AuthState;
  postsList: PostState;
  postContent: PostContentState;
  postForm: PostFormState;
};

export type AppActionsTypes =
  | PostsFormActionTypes
  | PostsActionTypes
  | PostsContentActionTypes
  | AuthActionTypes;

export type AppObjectActionsTypes =
  | PostFormObjectActionTypes
  | PostsObjectActionTypes
  | PostContentObjectActionTypes
  | AuthObjectActionTypes;

export interface MainReducerInterface {
  (
    pervState: InitialStateType,
    action: AppObjectActionsTypes
  ): InitialStateType;
}

export interface EnhancedStoreInterface<S, A> {
  (reducer: MainReducerInterface, state: S): [S, React.Dispatch<A>];
}

export type AppContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<AppActionsTypes>;
  isAuthenticated: () => boolean;
  getUserInfo: () => UserInfoType;
  isAdmin: () => boolean;
  canEdit: (userId:number) => boolean;
};
