import { useMemo, useState, useEffect } from 'react'
import { getErrorObject } from "./error-utils";

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