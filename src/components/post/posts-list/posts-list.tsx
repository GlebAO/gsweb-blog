import React from "react";
import PostModel from "../../../types/PostModel";
import PostListItem from "../post-list-item";

import "./posts-list.scss";

interface PostsListProps {
  posts: PostModel[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <div className="posts-list">
      {posts.map((item) => {
        return (
          <div key={item.id}>
            <PostListItem post={item} />
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
