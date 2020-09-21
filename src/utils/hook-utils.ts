import { useMemo, useState, useEffect, useCallback } from 'react'
import { getErrorObject } from "./error-utils";
import { useLocation } from "react-router-dom";
import { AppActionsTypes, DetailedEntity } from '../reducers/types';
import { useAppContext } from '../reducers';

interface initialStateInterface {
    loading: boolean,
    error: Error | null,
    data: null | {}
}

export const useRequest = (request: () => Promise<any>, disableFirstUpdate?: React.MutableRefObject<boolean>) => {

    const initialState = useMemo(
        () => ({
            loading: false,
            error: null,
            data: null,
        }),
        []
    );

    const [dataState, setDataState] = useState<initialStateInterface>(initialState);

    useEffect(() => {
        if (disableFirstUpdate && disableFirstUpdate.current) {
            // disable ComponentDidMount, component behaves as ComponentDidUpdate only
            disableFirstUpdate.current = false;
            return;
        }
        setDataState({ loading: true, error: null, data: null });
        let cancelled = false;
        request()
            .then((data) => {
                return (
                    !cancelled &&
                    setDataState({ data: data, error: null, loading: false })
                );
            })
            .catch(
                (err) =>
                    !cancelled &&
                    setDataState({ data: null, error: getErrorObject(err), loading: false })
            );

        return () => {
            cancelled = true
        }

    }, [initialState, request, disableFirstUpdate])

    return dataState;
};

export function useDetailedEntity<T>(
    slug: string,
    key: string
): [DetailedEntity<T> | null, React.Dispatch<AppActionsTypes>] {
    const { state, dispatch } = useAppContext();
    const stableDispatch = useCallback(dispatch, []);

    const { detailedEntities } = state;

    if (
        detailedEntities[key] === undefined ||
        detailedEntities[key][slug] === undefined
    ) {
        return [null, stableDispatch];
    }

    const itemState = detailedEntities[key][slug];

    return [itemState, stableDispatch];
}

export const useQueryString = () => {
    const { search } = useLocation();
    return search;
}