import React from "react";
import { getFormattedDate } from "../../../utils/date-utils";

interface PostInfoInterface {
  meta: {
    user: { name: string; imageUrl: string };
    createdAt: string;
  };
}

const PublishMeta: React.FC<PostInfoInterface> = ({
  meta: { user, createdAt },
}) => {
  return (
    <div className="post-info mb-1">
      <div className="d-flex align-items-center">
        {user && user.imageUrl?.length > 0 && (
          <div className="mr-2">
            <img
              src={`${process.env.REACT_APP_UPLOADS_DOMAIN}/avatars/1/${user.imageUrl}`}
              alt=""
              width={40}
              height={40}
              className="circle"
            />
          </div>
        )}

        <div>
          {user && (
            <span className="post-list-item__author text-secondary">
              {user.name}
            </span>
          )}
          <span className="post-list-item__createdAt text-secondary d-block">
            {createdAt && getFormattedDate(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PublishMeta;
