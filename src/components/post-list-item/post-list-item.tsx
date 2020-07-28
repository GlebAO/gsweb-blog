import React from "react";
import PostModel from "../../types/PostModel";

import "./post-list-item.scss";

const PostListItem: React.FC<{post:PostModel}> = ({post}) => {
  const { id, title, content } = post;
  return (
    <div id={`post-${id}`} className="post-list-item">
      <strong>{title}</strong>
      <p>{content}</p>
    </div>
  );
};

export default PostListItem;
