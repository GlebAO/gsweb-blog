import { BackendState, AppObjectActionsTypes } from "./types";
import {
  TOGGLE_SIDEBAR
} from "../actions/backend/types";

const backendReducer = (
  state: BackendState,
  action: AppObjectActionsTypes
):BackendState => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        sidebarOpened: !state.sidebarOpened
      };
    default:
      return state;
  }
};

export default backendReducer;