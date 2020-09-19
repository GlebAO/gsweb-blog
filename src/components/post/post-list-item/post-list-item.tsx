import React from "react";
import PostModel from "../../../types/PostModel";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../../../utils/date-utils";

import "./post-list-item.scss";
import PostTags from "../../tags/post-tags";
import PostStatusIndicator from "../post-status-indicator";

interface PostListItemProps {
  post: PostModel;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const { id, title, slug, user, createdAt, tags, status } = post;
  return (
    <div id={`post-${id}`} className="card post-list-item mb-2">
      <div className="post-list-item__body card-body px-md-4">

       <PostStatusIndicator status={status}/>

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
        <div className="post-list-item__main mb-1">
          <Link to={`/post/${slug}`} className="post-list-item__title h3">
            {title}
          </Link>
        </div>
        <div className="mb-3">
          {tags && <PostTags tags={tags} postId={id}/>}
        </div>
        <div className="">
          <Link to={`/post/${slug}`} className="text-decoration-none">Читать далее...</Link>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
