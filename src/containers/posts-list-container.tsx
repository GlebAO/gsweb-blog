import React, { useContext } from "react";
import { AppContext } from "../reducers";
import { fetchPosts } from "../actions/postsList/actions";
import { Spinner } from "../components/view";

import PostsList from "../components/posts-list";

const PostsListContainer = () => {
  const { state, dispatch } = useContext(AppContext);

  const {
    postsList: { posts, loading, error },
  } = state;

  const handleBtnClick = () => {
    dispatch(fetchPosts());
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
