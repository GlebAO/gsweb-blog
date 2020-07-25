import React, { useContext, useEffect } from "react";
import { AppContext } from "../reducers";
import { fetchPosts } from "../actions/postsList/actions";
import { Spinner } from "../components/view";

import PostsList from "../components/posts-list";
import BlogServiceContext from "../components/blog-service-context";

const PostsListContainer = () => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);

  useEffect(() => {
    if(blogService){
      dispatch(fetchPosts(blogService));
    }
  }, [dispatch, blogService])

  const {
    postsList: { posts, loading, error },
  } = state;

  const handleBtnClick = () => {
    if(blogService){
      dispatch(fetchPosts(blogService));
    }
  };

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div>
      <PostsList posts={posts} />
      <button className="btn btn-primary" onClick={handleBtnClick}>
        Get content
      </button>
    </div>
  );
};

export default PostsListContainer;
