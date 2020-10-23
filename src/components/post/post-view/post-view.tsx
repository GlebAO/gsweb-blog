import React, { useContext, useEffect } from "react";
import PostModel from "../../../types/PostModel";
import DOMpurify from "dompurify";
import { AppContext } from "../../../reducers";
import Prism from "prismjs";
import ReactMarkdown from "react-markdown";
import PostTags from "../../tags/post-tags";
import PostManageToolbar from "../post-manage-toolbar";

import "./post-view.scss";
import "../../../assets/css/prism.css";
import "react-markdown-editor-lite/lib/index.css";
import { CommentsContainer } from "../../../containers";
import { CommentTypes } from "../../../types/CommentModel";
import PublishMeta from "../../common/publish-meta";

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
      // XSS test
      // return (
      //   <div
      //     className="post-content-body"
      //     dangerouslySetInnerHTML={{ __html: content }}
      //   />
      // )
      return (
        <div className="post-content">
          <ReactMarkdown
            source={DOMpurify.sanitize(content)}
            disallowedTypes={["heading", "html", "link"]}
            unwrapDisallowed={true}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="card post-view mb-3">
        <div className="position-relative">
          {isPostAuthor(userId) && (
            <PostManageToolbar status={status} slug={slug} />
          )}

          <div className="card-body p-md-5">
            <PublishMeta meta={{user, createdAt}}/>
            <h1 className="font-weight-bold mb-3">{title}</h1>
            <div className="mb-3">
              {tags && <PostTags tags={tags} postId={id} />}
            </div>
            {renderContent(content)}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="mb-1">
            <strong>Комментарии:</strong>
          </div>
          <CommentsContainer
            commentableType={CommentTypes.POST}
            commentableId={id}
          />
        </div>
      </div>
    </>
  );
};

export default PostView;
