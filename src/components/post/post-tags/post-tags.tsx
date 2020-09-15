import React from "react";
import TagModel from "../../../types/TagModel";
import { Link } from "react-router-dom";

import "./post-tags.scss"

interface PostTagsInterface {
  postId: number;
  tags: TagModel[];
}

const PostTags: React.FC<PostTagsInterface> = ({ tags, postId }) => {
  return (
    <div className="post-tags ml-n2">
      {tags.map((tag: TagModel) => (
        <PostTagItem key={`${tag.slug}-${postId}`} tag={tag} />
      ))}
    </div>
  );
};

const PostTagItem: React.FC<{ tag: TagModel }> = ({ tag }) => {
  return (
    <Link to={`/tag/${tag.slug}`} className="post-tag-item px-2 py-1">
      #{tag.title}
    </Link>
  );
};

export default PostTags;
