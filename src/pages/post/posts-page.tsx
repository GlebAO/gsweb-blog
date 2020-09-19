import React, { useContext } from "react";
import { EntitiesContainer } from "../../containers";
import { TagsListContainer } from "../../containers";
import PostsListLayout from "./posts-list-layout";
import { BlogServiceContext } from "../../context";
import config from "../../config";
import PostsList from "../../components/post/posts-list";

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
      center={
        <EntitiesContainer
          entityKey={config.entities.PUBLIC_POSTS}
          endpoint={blogService!.getPosts}
        >
          {(items) => <PostsList posts={items} />}
        </EntitiesContainer>
      }
      right={<Banner />}
    />
  );
};

export default PostsPage;
