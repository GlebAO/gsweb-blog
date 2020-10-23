import React, { useContext } from "react";
import CommentsTable from "../../components/backend/comments-table";
import config from "../../config";
import EntitiesContainer from "../../containers/entities-container";
import { BlogServiceContext } from "../../context";

const CommentsManagement = () => {
  const blogService = useContext(BlogServiceContext);
  return (
    <div>
      <EntitiesContainer
        entityKey={config.entities.ADMIN_COMMENTS}
        endpoint={blogService!.getAllComments}
      >
        {(items) => <CommentsTable items={items}/>}
      </EntitiesContainer>
    </div>
  );
};

export default CommentsManagement;