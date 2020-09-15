import { DetailedEntityItemsObjectActionTypes, 
    FETCH_DETAILED_ENTITY_FAILURE, FETCH_DETAILED_ENTITY_REQUEST, FETCH_DETAILED_ENTITY_SUCCESS, 
    DetailedEntityItemsLoadedAction, DetailedEntityItemsRequestedAction, DetailedEntityItemsErrorAction } from "./types";
import { InitialStateType } from "../../reducers/types";

const detailedEntityItemsRequested = (detailedEntityName: string): DetailedEntityItemsRequestedAction => {
    return {
        detailedEntityName,
        type: FETCH_DETAILED_ENTITY_REQUEST
    };
};

const detailedEntityItemsLoaded = <T extends {}>(detailedEntityName: string, detailedEntityItem: T): DetailedEntityItemsLoadedAction<T> => {
    return {
        detailedEntityName,
        type: FETCH_DETAILED_ENTITY_SUCCESS,
        payload: detailedEntityItem
    };
};

const detailedEntityItemsError = <T extends {}>(detailedEntityName: string, error: Error): DetailedEntityItemsErrorAction => {
    return {
        detailedEntityName,
        type: FETCH_DETAILED_ENTITY_FAILURE,
        payload: error
    };
};

export const fetchDetailedEntityItem = <T extends {}>(detailedEntityName: string, endpoint: () => Promise<T>) => (dispatch: React.Dispatch<DetailedEntityItemsObjectActionTypes<T>>, getState: () => InitialStateType): void => {
    const { detailedEntities } = getState();
    
    //console.log('fetchDetailedEntityItems', detailedEntities[detailedEntityName], page, loadedPage )

    if (detailedEntities[detailedEntityName] === undefined) {
        dispatch(detailedEntityItemsRequested(detailedEntityName));
        endpoint()
            .then((data) => dispatch(detailedEntityItemsLoaded(detailedEntityName, data)))
            .catch((err) => dispatch(detailedEntityItemsError(detailedEntityName, err)));
    }
}