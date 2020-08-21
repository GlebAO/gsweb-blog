import React, { useContext } from "react";
import PostModel from "../../../types/PostModel";
import DOMpurify from "dompurify";
import { AppContext } from "../../../reducers";
import EditButton from "../../common/edit-button";

import "./post-view.scss";

interface PostViewProps {
  post: PostModel;
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
  const { canEdit } = useContext(AppContext);
  const { title, content, userId, slug } = post;
  return (
    <div className="post-view">
      <div className="card position-relative">
        <div className="post-toolbar">
          {canEdit(userId) && <EditButton url={`/post/edit/${slug}`} />}
        </div>
        <div className="card-body p-md-5">
          <h1 className="font-weight-bold mb-3">{title}</h1>
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
