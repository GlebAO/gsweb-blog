import React from "react";
import TagModel from "../../../types/TagModel";
import PostTagItem from "../post-tag-item"; 

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

export default PostTags;
