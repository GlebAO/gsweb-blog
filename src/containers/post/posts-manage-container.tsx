import React, { useLayoutEffect, useContext, useCallback } from "react";
import PostsTable from "../../components/backend/posts-table";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { Spinner } from "../../components/common/spinner";
import { Redirect } from "react-router-dom";
import { fetchAllPosts, postsShowMore } from "../../actions/postsList/actions";
import ShowMoreButton from "../../components/common/show-more-button";

const PostsManageContainer = () => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  const {
    postsList: { posts, total, page, perPage, loading, error },
  } = state;

  useLayoutEffect(() => {
    if (blogService) {
      stableDispatch(fetchAllPosts(blogService, page));
    }
  }, [stableDispatch, blogService, page]);

  if (error) {
    return <Redirect to="/404" />;
  }

  const handleShowMoreClick = () => {
    dispatch(postsShowMore());
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
