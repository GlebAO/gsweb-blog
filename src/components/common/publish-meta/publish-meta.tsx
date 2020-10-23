import React from "react";
import { getFormattedDate } from "../../../utils/date-utils";

interface PostInfoInterface {
  meta: {
    user: { name: string };
    createdAt: string;
  };
}

const PublishMeta: React.FC<PostInfoInterface> = ({meta: { user, createdAt }}) => {
  return (
    <div className="post-info">
      {user && (
        <span className="post-list-item__author text-secondary">
          {user.name}
        </span>
      )}
      <span className="post-list-item__createdAt text-secondary d-block">
        {createdAt && getFormattedDate(createdAt)}
      </span>
    </div>
  );
};

export default PublishMeta;
