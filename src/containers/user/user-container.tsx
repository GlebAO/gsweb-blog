import React, { useEffect, useContext, useCallback } from "react";
import UsersTable from "../../components/users-table";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchUsers } from "../../actions/usersList/actions";
import { Spinner } from "../../components/common/spinner";
import { Redirect } from "react-router-dom";

const UserContainer = () => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchUsers(blogService));
    }
  }, [stableDispatch, blogService]);

  const { usersList } = state;

  if (!usersList) {
    return <Spinner />;
  }

  const { users, loading, error } = usersList;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <div>
      <UsersTable items={users} />
    </div>
  );
};

export default UserContainer;
