import React, { useLayoutEffect, useContext, useCallback } from "react";
import PostsTable from "../../components/backend/posts-table";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { Spinner } from "../../components/common/spinner";
import ShowMoreButton from "../../components/common/show-more-button";

import { fetchEntityItems, entityItemsShowMore } from "../../actions/entities/actions"

import PostModel from "../../types/PostModel";
import ResponseErrorIndicator from "../../components/common/response-error-indicator";

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
    return <ResponseErrorIndicator error={error} />
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
