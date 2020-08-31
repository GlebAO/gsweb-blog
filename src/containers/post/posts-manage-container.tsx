import React, { useLayoutEffect, useContext, useCallback } from "react";
import PostsTable from "../../components/backend/posts-table";
import { useAppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { Spinner } from "../../components/common/spinner";
import { Redirect } from "react-router-dom";
import { fetchAllPosts } from "../../actions/postsList/actions";

const PostsManageContainer = () => {
  const { state, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  useLayoutEffect(() => {
    if (blogService) {
      stableDispatch(fetchAllPosts(blogService));
    }
  }, [stableDispatch, blogService]);

  const { postsList } = state;

  if (!postsList) {
    return <Spinner />;
  }

  const { posts, loading, error } = postsList;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error)
    return <span>"error"</span>;
    //return <Redirect to="/404" />;
  }

  return (
    <div>
      <PostsTable items={posts} />
    </div>
  );
};

export default PostsManageContainer;
