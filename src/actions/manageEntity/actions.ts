import {
  MANAGE_ENTITY_FAILURE,
  MANAGE_ENTITY_REQUEST,
  MANAGE_ENTITY_SUCCESS,
  ManageEntityRequestedAction,
  ManageEntityLoadedAction,
  ManageEntityErrorAction,
  ManageEntityObjectActionTypes,
  DELETE_ENTITY_SUCCESS,
  DeleteEntityAction
} from "./types";
import { getErrorObject } from "../../utils/error-utils";
import { ResponseError } from "../../reducers/types";

const manageEntityRequested = (key: string, detailedEntityName: string): ManageEntityRequestedAction => {
  return {
    key,
    detailedEntityName,
    type: MANAGE_ENTITY_REQUEST,
  };
};

export const manageEntitySuccess = <T extends {}>(key: string, detailedEntityName: string, payload: T): ManageEntityLoadedAction<T> => {
  return {
    key,
    detailedEntityName,
    payload,
    type: MANAGE_ENTITY_SUCCESS,
  };
};

export const deleteEntity = (entityName: string, itemId: number): DeleteEntityAction => {
  return {
    entityName,
    itemId,
    type: DELETE_ENTITY_SUCCESS,
  };
};

const manageEntityError = (key: string, detailedEntityName: string, payload: ResponseError): ManageEntityErrorAction => {
  return {
    key,
    detailedEntityName,
    payload,
    type: MANAGE_ENTITY_FAILURE,
  };
};

export const manageEntity = <T extends {}>(key: string, detailedEntityName: string, endpoint: () => Promise<T>) => (
  dispatch: React.Dispatch<ManageEntityObjectActionTypes<T>>,
  getState: () => any
): void => {
  dispatch(manageEntityRequested(key, detailedEntityName));
  endpoint()
    .then((data) => {
      dispatch(manageEntitySuccess(key, detailedEntityName, data))
    })
    .catch((err) => dispatch(manageEntityError(key, detailedEntityName, getErrorObject(err))));
}