import { EntityItemsObjectActionTypes, INC_ENTITY_PAGE, FETCH_ENTITY_FAILURE, FETCH_ENTITY_REQUEST, FETCH_ENTITY_SUCCESS } from "./types";
import { InitialStateType } from "../../reducers/types";

const entityItemsRequested = (entityName: string): EntityItemsObjectActionTypes => {
    return {
        entityName,
        type: FETCH_ENTITY_REQUEST
    };
};

const entityItemsLoaded = (entityName: string, entityItemsList: [any[], number]): EntityItemsObjectActionTypes => {
    return {
        entityName,
        type: FETCH_ENTITY_SUCCESS,
        payload: entityItemsList
    };
};

const entityItemsError = (entityName: string, error: Error): EntityItemsObjectActionTypes => {
    return {
        entityName,
        type: FETCH_ENTITY_FAILURE,
        payload: error
    };
};

export const entityItemsShowMore = (entityName: string): EntityItemsObjectActionTypes => {
    return {
        entityName,
        type: INC_ENTITY_PAGE,
    };
};

export const fetchEntityItems = (entityName: string, endpoint: (page: number) => Promise<any>, page: number) => (dispatch: React.Dispatch<EntityItemsObjectActionTypes>, getState: () => InitialStateType): void => {
    const { entities } = getState();
    const loadedPage = entities[entityName] ? entities[entityName].page : 1;

    //console.log('fetchEntityItems', entities[entityName], page, loadedPage )

    if ( (entities[entityName] === undefined && page === 1) || page > loadedPage) {
        dispatch(entityItemsRequested(entityName));
        endpoint(page)
            .then((data) => dispatch(entityItemsLoaded(entityName, data)))
            .catch((err) => dispatch(entityItemsError(entityName, err)));
    }

}