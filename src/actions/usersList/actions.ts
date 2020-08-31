import { UsersObjectActionTypes, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./types";
import UserModel from "../../types/UserModel";
import { InitialStateType } from "../../reducers/types";
import { BlogServiceInterface } from "../../services/types";

const usersRequested = (): UsersObjectActionTypes => {
    return {
        type: FETCH_USERS_REQUEST
    };
};

const usersLoaded = (newUsers: UserModel[]): UsersObjectActionTypes => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: newUsers
    };
};

const usersError = (error: Error): UsersObjectActionTypes => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
};

const fetchUsers = (service: BlogServiceInterface) => (dispatch: React.Dispatch<UsersObjectActionTypes>, getState: () => InitialStateType): void => {
  //  const state = getState();
  //  const {usersList} = state;
  //  if ( usersList ) {
  //      const {users } = usersList;
  //      users.length > 0 && dispatch(usersLoaded(users))
  //  } else {
        dispatch(usersRequested());
        service.getUsers()
            .then((data) => dispatch(usersLoaded(data)))
            .catch((err) => dispatch(usersError(err)));
   // }
}


export { fetchUsers }