import React from "react";
import PostModel from "../../../types/PostModel";

import "./post-view.scss";

interface PostViewProps {
  post: PostModel;
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
  const { title, content } = post;
  return (
    <div className="post-view">
      <div className="card">
        <div className="card-body">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostView;
