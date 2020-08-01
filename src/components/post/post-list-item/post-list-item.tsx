import React from "react";
import PostModel from "../../../types/PostModel";
import { Link } from 'react-router-dom';

import "./post-list-item.scss";

interface PostListItemProps {
  post: PostModel;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const { id, title, slug } = post;
  return (
    <div id={`post-${id}`} className="card post-list-item mb-2">
      <div className="card-body">
        <Link to={`/post/${slug}`}>
        <strong>{title}</strong>
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
