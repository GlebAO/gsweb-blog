import React, { useContext } from "react";
import { PostsListContainer } from "../../containers";
import { TagsListContainer } from "../../containers";
import PostsListLayout from "./posts-list-layout";
import { BlogServiceContext } from "../../context";
import config from "../../config";

const Banner = () => {
  return (
    <div className="banner">
      <div className="mb-2">
        <span>О проекте</span>
      </div>
      <div className="card bg-light">
        <div className="card-body">
          <p className="lead">Блог о веб-разработке компании GSweb</p>
        </div>
      </div>
    </div>
  );
};

const PostsPage = () => {
  const blogService = useContext(BlogServiceContext);
  return (
    <PostsListLayout
      left={<TagsListContainer />}
      center={<PostsListContainer entityKey={config.entities.PUBLIC_POSTS} endpoint={blogService!.getPosts} />}
      right={<Banner />}
    />
  );
};

export default PostsPage;
