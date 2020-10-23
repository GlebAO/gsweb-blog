import React, { useCallback, useContext } from "react";
import { EntitiesContainer } from ".";
import { CommentsForm, CommentsTree } from "../components/comments";
import config from "../config";
import { CommentTypes } from "../types/CommentModel";
import { BlogServiceContext } from "../context";
import { useAppContext } from "../reducers";
import { Link } from "react-router-dom";

interface CommentsContainerInterface {
  commentableType: CommentTypes.POST;
  commentableId: number;
}

const CommentsContainer: React.FC<CommentsContainerInterface> = ({
  commentableId,
  commentableType,
}) => {
  const blogService = useContext(BlogServiceContext);
  const { isAuthenticated } = useAppContext();

  const stableGetComments = useCallback(
    () => blogService!.getComments(commentableId, commentableType),
    [commentableId, commentableType, blogService]
  );

  const renderAlert = function () {
    return (
      <p className="text-muted">
        Чтобы оставить комментарий необходимо <Link to="/login">войти</Link> или{" "}
        <Link to="/signup">зарегистрироваться</Link>
      </p>
    );
  };

  return (
    <div>
      <div className="mb-2">
        {isAuthenticated() ? (
          <CommentsForm
            commentableType={CommentTypes.POST}
            commentableId={commentableId}
          />
        ) : (
          renderAlert()
        )}
      </div>
      <EntitiesContainer
        entityKey={config.entities.PUBLIC_COMMENTS_FOR_ENTITY(
          commentableId,
          commentableType
        )}
        endpoint={stableGetComments}
      >
        {(items) => <CommentsTree items={items} />}
      </EntitiesContainer>
    </div>
  );
};

export default CommentsContainer;
