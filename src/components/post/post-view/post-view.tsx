import React, { useContext, useEffect } from "react";
import PostModel from "../../../types/PostModel";
import DOMpurify from "dompurify";
import { AppContext } from "../../../reducers";
import { getFormattedDate } from "../../../utils/date-utils";
import Prism from "prismjs";

import "./post-view.scss";
import "../../../assets/css/prism.css";
import PostTags from "../../tags/post-tags";
import PostManageToolbar from "../post-manage-toolbar";

interface PostViewProps {
  post: PostModel;
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
  const { isPostAuthor } = useContext(AppContext);
  const {
    id,
    title,
    content,
    userId,
    slug,
    user,
    createdAt,
    tags,
    status,
  } = post;

  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  }, []);

  const renderContent = (content: string | undefined) => {
    if (content) {
      return (
        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(content) }}
        />
      );
    }
    return null;
  };

  return (
    <div className="post-view">
      <div className="position-relative">
        {isPostAuthor(userId) && (
          <PostManageToolbar status={status} slug={slug}/>
        )}

        <div className="card-body p-md-5">
          {user && (
            <span className="post-list-item__author text-secondary">
              {user.name}
            </span>
          )}
          <span className="post-list-item__createdAt text-secondary d-block">
            {createdAt && getFormattedDate(createdAt)}
          </span>
          <h1 className="font-weight-bold mb-3">{title}</h1>
          <div className="mb-3">
            {tags && <PostTags tags={tags} postId={id} />}
          </div>
          {renderContent(content)}
        </div>
      </div>
    </div>
  );
};

export default PostView;
