import PostModel from "../types/PostModel";
import UserModel, { UserInfoType } from "../types/UserModel"
import {
  PostContentObjectActionTypes,
  PostsContentActionTypes,
} from "../actions/postContent/types";
import {
  PostFormObjectActionTypes,
  PostsFormActionTypes,
} from "../actions/postForm/types";

import {
  EntityItemsObjectActionTypes,
  EntityItemsActionTypes,
} from "../actions/entities/types";

import { AuthObjectActionTypes, AuthActionTypes } from "../actions/auth/types";
import { BackendObjectActionTypes } from "../actions/backend/types"
import TagModel from "../types/TagModel";
import { DetailedEntityItemsActionTypes, DetailedEntityItemsObjectActionTypes } from "../actions/detailedEntities/types";

export interface ResponseError extends Error {
  status?: number;
}

export type PostState = {
  posts: PostModel[];
  total: number,
  page: number,
  perPage: number,
  loading: boolean;
  error: null | Error;
};

export interface FilterObjectInterface {
  [prop: string] : string | number
}

export type EntityState<T> = {
  items: T[];
  total: number,
  page: number,
  perPage: number,
  loading: boolean;
  error: null | Error;
  filter: FilterObjectInterface | undefined
}

export type DetailedEntityState<T> = {
    [key: string]: DetailedEntity<T>
}

export type DetailedEntity<T> = {
  item: T | null;
  loading: boolean;
  error: null | Error;
}

export type UserState = {
  users: UserModel[];
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
  setRedirect: boolean;
  registered?: boolean;
  confirmed?: boolean;
};

export type BackendState = {
  sidebarOpened: boolean
}

export type EntitiesTypes = PostModel | UserModel | TagModel;

export type InitialStateType<T = any> = {
  auth: AuthState;
  postContent: PostContentState;
  postForm: PostFormState;
  backend: BackendState;
  entities: { [x: string]: EntityState<T> };
  detailedEntities: { [x: string]: DetailedEntityState<T> };
};

export type AppActionsTypes =
  | PostsFormActionTypes
  | PostsContentActionTypes
  | AuthActionTypes
  | BackendObjectActionTypes
  | EntityItemsActionTypes<EntitiesTypes>
  | DetailedEntityItemsActionTypes<EntitiesTypes>

export type AppObjectActionsTypes =
  | PostFormObjectActionTypes
  | PostContentObjectActionTypes
  | AuthObjectActionTypes
  | BackendObjectActionTypes
  | EntityItemsObjectActionTypes<EntitiesTypes>
  | DetailedEntityItemsObjectActionTypes<EntitiesTypes>

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
  isPostAuthor: (userId: number) => boolean;
};