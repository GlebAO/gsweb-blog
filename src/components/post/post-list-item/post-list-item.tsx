import React from "react";
import PostModel from "../../../types/PostModel";
import { Link } from "react-router-dom";

import "./post-list-item.scss";
import PostTags from "../../tags/post-tags";
import PostStatusIndicator from "../post-status-indicator";
import { useAppContext } from "../../../reducers";
import PublishMeta from "../../common/publish-meta";

interface PostListItemProps {
  post: PostModel;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const { isPostAuthor } = useAppContext();
  const { id, title, slug, user, userId, createdAt, tags, status } = post;
  return (
    <div id={`post-${id}`} className="card post-list-item mb-2">
      <div className="post-list-item__body card-body px-md-4">
        {isPostAuthor(userId) && <PostStatusIndicator status={status} />}

        <div className="post-list-item__top">
          <PublishMeta meta={{ user, createdAt }} />
        </div>
        <div className="post-list-item__main mb-1">
          <Link to={`/post/${slug}`} className="post-list-item__title h3">
            {title}
          </Link>
        </div>
        <div className="mb-3">
          {tags && <PostTags tags={tags} postId={id} />}
        </div>
        <div className="">
          <Link to={`/post/${slug}`} className="text-decoration-none">
            Читать далее...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
