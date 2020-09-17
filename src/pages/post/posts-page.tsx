import React from "react";
import { PostsListContainer } from "../../containers";
import { TagsListContainer } from "../../containers";
import PostsListLayout from "./posts-list-layout";

const Banner = () => {
  return (
    <div className="banner">
    <div className="mb-2"><span>О проекте</span></div>
        <div className="card bg-light">
          <div className="card-body">
            <p className="lead">Блог о веб-разработке компании GSweb</p>
          </div>
        </div>
        </div>
  )
}

const PostsPage = () => <PostsListLayout left={<TagsListContainer />} center={<PostsListContainer />} right={<Banner />} />

export default PostsPage;
