import {
    TOGGLE_SIDEBAR,
    BackendObjectActionTypes
} from "./types";

export const toggleSidebar = (): BackendObjectActionTypes => {
    return {
        type: TOGGLE_SIDEBAR,
    };
};