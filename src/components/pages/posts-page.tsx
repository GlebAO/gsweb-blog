import React from "react";
import PostsList from "../post/posts-list";
import PostModel from "../../types/PostModel";

const PostsPage: React.FC<{ posts: PostModel[] }> = ({ posts }) => {
  return (
    <div className="posts-page row">
      <div className="col-md-9">
        <PostsList posts={posts} />
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default PostsPage;
