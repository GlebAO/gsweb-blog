import React from "react";
import PostModel from "../../types/PostModel";

import "./posts-list.scss";

interface PostsListProps {
  posts: PostModel[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <ul>
            {posts.map((item) => {
              return <li key={item.id}>{item.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostsList;
