import { UserState, AppObjectActionsTypes } from "./types";
import {
    FETCH_USERS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS
} from "../actions/usersList/types";

const usersReducer = (state: UserState | undefined, action: AppObjectActionsTypes) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                users: [],
                loading: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                users: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_USERS_FAILURE:
            return {
                users: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;
