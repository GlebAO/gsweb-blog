import { EntityItemsObjectActionTypes, INC_ENTITY_PAGE, FETCH_ENTITY_FAILURE, FETCH_ENTITY_REQUEST, FETCH_ENTITY_SUCCESS, EntityItemsLoadedAction, EntityItemsShowMoreAction, EntityItemsRequestedAction, EntityItemsErrorAction } from "./types";
import { InitialStateType, FilterObjectInterface } from "../../reducers/types";
import { EntityWithTotal } from "../../services/types";


const entityItemsRequested = (entityName: string): EntityItemsRequestedAction => {
    return {
        entityName,
        type: FETCH_ENTITY_REQUEST
    };
};

const entityItemsLoaded = <T extends {}>(entityName: string, entityItemsList: [T[], number]): EntityItemsLoadedAction<T> => {
    return {
        entityName,
        type: FETCH_ENTITY_SUCCESS,
        payload: entityItemsList
    };
};

const entityItemsError = <T extends {}>(entityName: string, error: Error): EntityItemsErrorAction => {
    return {
        entityName,
        type: FETCH_ENTITY_FAILURE,
        payload: error
    };
};

export const entityItemsShowMore = (entityName: string): EntityItemsShowMoreAction => {
    return {
        entityName,
        type: INC_ENTITY_PAGE,
    };
};

export const fetchEntityItems = <T extends {}>(entityName: string, endpoint: (page: number, perPage?:number, filter?: FilterObjectInterface) => Promise<EntityWithTotal<T>>, page: number, perPage?: number, filter?: {}) => (dispatch: React.Dispatch<EntityItemsObjectActionTypes<T>>, getState: () => InitialStateType): void => {
    const { entities } = getState();
    const loadedPage = entities[entityName] ? entities[entityName].page : 1;

    //console.log('fetchEntityItems', entities[entityName], page, loadedPage )

    if ((entities[entityName] === undefined && page === 1) || page > loadedPage) {
        dispatch(entityItemsRequested(entityName));
        endpoint(page, perPage, filter)
            .then((data) => dispatch(entityItemsLoaded(entityName, data)))
            .catch((err) => dispatch(entityItemsError(entityName, err)));
    }

}