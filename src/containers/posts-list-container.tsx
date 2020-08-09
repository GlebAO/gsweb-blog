import React, { useContext, useEffect, useCallback } from "react";
import { AppContext } from "../reducers";
import { fetchPosts } from "../actions/postsList/actions";
import { Spinner } from "../components/common/brand-logo";

import PostsList from "../components/post/posts-list";
import { BlogServiceContext } from "../context";

const PostsListContainer = () => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchPosts(blogService));
    }
  }, [stableDispatch, blogService]);

  const {
    postsList: { posts, loading, error },
  } = state;

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (posts.length === 0) {
    return <p>Нет ни одного поста</p>
  }

  return <PostsList posts={posts} />;
};

export default PostsListContainer;
