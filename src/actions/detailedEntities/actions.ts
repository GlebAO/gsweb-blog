import { DetailedEntityItemsObjectActionTypes, 
    FETCH_DETAILED_ENTITY_FAILURE, FETCH_DETAILED_ENTITY_REQUEST, FETCH_DETAILED_ENTITY_SUCCESS, 
    DetailedEntityItemsLoadedAction, DetailedEntityItemsRequestedAction, DetailedEntityItemsErrorAction } from "./types";
import { InitialStateType } from "../../reducers/types";

const detailedEntityItemsRequested = (detailedEntityName: string, key: string ): DetailedEntityItemsRequestedAction => {
    return {
        detailedEntityName,
        key,
        type: FETCH_DETAILED_ENTITY_REQUEST
    };
};

const detailedEntityItemsLoaded = <T extends {}>(detailedEntityName: string, key: string, detailedEntityItem: T): DetailedEntityItemsLoadedAction<T> => {
    return {
        key,
        detailedEntityName,
        type: FETCH_DETAILED_ENTITY_SUCCESS,
        payload: detailedEntityItem
    };
};

const detailedEntityItemsError = <T extends {}>(detailedEntityName: string, key: string, error: Error): DetailedEntityItemsErrorAction => {
    return {
        key,
        detailedEntityName,
        type: FETCH_DETAILED_ENTITY_FAILURE,
        payload: error
    };
};

export const fetchDetailedEntityItem = <T extends {}>(detailedEntityName: string, key: string, endpoint: () => Promise<T>) => (dispatch: React.Dispatch<DetailedEntityItemsObjectActionTypes<T>>, getState: () => InitialStateType): void => {
    const { detailedEntities } = getState();
    if(detailedEntities[detailedEntityName] && detailedEntities[detailedEntityName][key] && detailedEntities[detailedEntityName][key].item){
        // console.log('cached detailed entity', detailedEntities[detailedEntityName][key])
        dispatch(detailedEntityItemsLoaded(detailedEntityName, key, detailedEntities[detailedEntityName][key].item))
    }else{
        // console.log('CALL API DetailedEntityItems', detailedEntities)
        dispatch(detailedEntityItemsRequested(detailedEntityName, key));     
            endpoint()
                .then((data) => dispatch(detailedEntityItemsLoaded(detailedEntityName, key, data)))
                .catch((err) => dispatch(detailedEntityItemsError(detailedEntityName, key, err)));
    }    
}