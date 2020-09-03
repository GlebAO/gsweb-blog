import React, { useLayoutEffect, useContext, useCallback } from "react";
import PostsTable from "../../components/backend/posts-table";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { Spinner } from "../../components/common/spinner";
import { Redirect } from "react-router-dom";
import ShowMoreButton from "../../components/common/show-more-button";

import { fetchEntityItems, entityItemsShowMore } from "../../actions/entities/actions"

import PostModel from "../../types/PostModel";

const PostsManageContainer = () => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

 const { entities: { adminPosts } } = state;
 const page = adminPosts ? adminPosts.page : 1;

  useLayoutEffect(() => {
      stableDispatch(fetchEntityItems<PostModel>('adminPosts', blogService!.getAllPosts, page));
  }, [stableDispatch, blogService, page]);

  if(!adminPosts) {
    return null;
  }

  const { items:posts, total, perPage, loading, error } = adminPosts;

  if (error) {
    return <Redirect to="/404" />;
  }

  const handleShowMoreClick = () => {
    dispatch(entityItemsShowMore('adminPosts'));
  };

  return (
    <div>
      <PostsTable items={posts} />
      {loading && <Spinner />}
      <ShowMoreButton loading={loading} page={page} perPage={perPage} total={total} onClick={handleShowMoreClick} />
    </div>
  );
};

export default PostsManageContainer;
