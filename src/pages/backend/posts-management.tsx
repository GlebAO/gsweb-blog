import React, { useContext } from "react";
import PostsTable from "../../components/backend/posts-table";
import config from "../../config";
import EntitiesContainer from "../../containers/entities-container";
import { BlogServiceContext } from "../../context";

const PostsManagement = () => {
  const blogService = useContext(BlogServiceContext);
  return (
    <div>
      <EntitiesContainer
        entityKey={config.entities.ADMIN_POSTS}
        endpoint={blogService!.getAllPosts}
      >
        {(items) => <PostsTable items={items}/>}
      </EntitiesContainer>
    </div>
  );
};

export default PostsManagement;
