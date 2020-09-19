import React, { useContext } from "react";
import PostsList from "../../components/post/posts-list";
import config from "../../config";
import { EntitiesContainer } from "../../containers";
import { BlogServiceContext } from "../../context";

const OwnPosts = () => {
  const blogService = useContext(BlogServiceContext);
  return (
    <div>
      <h1>Мои посты</h1>
      <EntitiesContainer
        entityKey={config.entities.OWN_POSTS}
        endpoint={blogService!.getOwnPosts}
      >
        {(items) => <PostsList posts={items} />}
      </EntitiesContainer>
    </div>
  );
};

export default OwnPosts;
