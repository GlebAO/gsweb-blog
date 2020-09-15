import React from "react";
import TagModel from "../../../types/TagModel";
import { Link } from "react-router-dom";

const PostTagItem: React.FC<{ tag: TagModel }> = ({ tag }) => {
    return (
      <Link to={`/t/${tag.slug}`} className="post-tag-item px-2 py-1">
        #{tag.title}
      </Link>
    );
  };

  export default PostTagItem;