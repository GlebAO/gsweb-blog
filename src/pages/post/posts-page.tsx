import React from "react";
import { PostsListContainer } from "../../containers";
import { TagsListContainer } from "../../containers";

const PostsPage = () => {
  return (
    <div className="posts-page row">
      <div className="col-md-2">
        <TagsListContainer />
      </div>
      <div className="col-md-7">
        <PostsListContainer />
      </div>
      <div className="col-md-3">
        <div className="mb-2"><span>О проекте</span></div>
        <div className="card bg-light">
          <div className="card-body">
            <p className="lead">Блог о веб-разработке компании GSweb</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
