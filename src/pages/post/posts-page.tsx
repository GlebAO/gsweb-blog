import React from "react";
import { PostsListContainer } from "../../containers";

const PostsPage = () => {
  return (
    <div className="posts-page row">
      <div className="col-md-2"></div>
      <div className="col-md-7">
        <PostsListContainer />
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default PostsPage;
