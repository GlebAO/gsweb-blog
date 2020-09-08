import React from "react";
import PostModel from "../../../types/PostModel";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../../../utils/date-utils";

import "./post-list-item.scss";

interface PostListItemProps {
  post: PostModel;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const { id, title, slug, user, createdAt } = post;
  return (
    <div id={`post-${id}`} className="card post-list-item mb-2">
      <div className="post-list-item__body card-body px-md-4">
        <div className="post-list-item__top">
          {user && (
            <span className="post-list-item__author text-secondary">
              {user.name}
            </span>
          )}
          <span className="post-list-item__createdAt text-secondary d-block">
            {getFormattedDate(createdAt)}
          </span>
        </div>
        <div className="post-list-item__main mb-2">
          <Link to={`/post/${slug}`} className="post-list-item__title h3">
            {title}
          </Link>
        </div>
        <div className="">
          <Link to={`/post/${slug}`}>Читать далее...</Link>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
