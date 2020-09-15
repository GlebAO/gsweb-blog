import React, { useContext, useEffect } from "react";
import PostModel from "../../../types/PostModel";
import DOMpurify from "dompurify";
import { AppContext } from "../../../reducers";
import EditButton from "../../common/edit-button";
import { getFormattedDate } from "../../../utils/date-utils";
import Prism from "prismjs";

import "./post-view.scss";
import "../../../assets/css/prism.css";
import PostTags from "../post-tags";

interface PostViewProps {
  post: PostModel;
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
  const { canEdit } = useContext(AppContext);
  const { id, title, content, userId, slug, user, createdAt, tags } = post;

  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  }, []);

  return (
    <div className="post-view">
      <div className="card position-relative">
        <div className="post-toolbar">
          {canEdit(userId) && <EditButton url={`/post/edit/${slug}`} />}
        </div>
        <div className="card-body p-md-5">
          {user && (
            <span className="post-list-item__author text-secondary">
              {user.name}
            </span>
          )}
          <span className="post-list-item__createdAt text-secondary d-block">
            {getFormattedDate(createdAt)}
          </span>
          <h1 className="font-weight-bold mb-3">{title}</h1>
          <div className="mb-3">
            {tags && <PostTags tags={tags} postId={id}/>}
          </div>
          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostView;
