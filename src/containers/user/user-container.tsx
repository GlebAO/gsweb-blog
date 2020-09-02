import React, { useLayoutEffect, useContext, useCallback } from "react";
import UsersTable from "../../components/backend/users-table";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { Spinner } from "../../components/common/spinner";
import { Redirect } from "react-router-dom";
import {
  fetchEntityItems,
  entityItemsShowMore,
} from "../../actions/entities/actions";
import ShowMoreButton from "../../components/common/show-more-button";
import UserModel from "../../types/UserModel"

const UserContainer = () => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  const {
    entities: { adminUsers },
  } = state;
  const page = adminUsers ? adminUsers.page : 1;

  useLayoutEffect(() => {
    stableDispatch(fetchEntityItems("adminUsers", blogService!.getUsers, page));
  }, [stableDispatch, blogService, page]);

  if (!adminUsers) {
    return <span>Нет записей.</span>;
  }
  const { items: users, total, perPage, loading, error } = adminUsers;

  if (error) {
    return <Redirect to="/404" />;
  }

  const handleShowMoreClick = () => {
    dispatch(entityItemsShowMore("adminUsers"));
  };

  type u = typeof users;

  return (
    <div>
      <UsersTable items={users} />
      {loading && <Spinner />}
      <ShowMoreButton
        loading={loading}
        page={page}
        perPage={perPage}
        total={total}
        onClick={handleShowMoreClick}
      />
    </div>
  );
};

export default UserContainer;
