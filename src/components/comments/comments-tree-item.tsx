import React, { useContext, useState } from "react";
import CommentModel, { CommentTypes } from "../../types/CommentModel";
import PublishMeta from "../common/publish-meta";
import CommentsForm from "./comments-form";
import DOMpurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../reducers";

import "./comments-tree-item.scss";
import { BlogServiceContext } from "../../context";
import { deleteEntity } from "../../actions/manageEntity/actions";
import config from "../../config";

interface CommentsTreeItemInterface {
  item: CommentModel;
}

const CommentsTreeItem: React.FC<CommentsTreeItemInterface> = ({ item }) => {
  const {
    id,
    content,
    author,
    createdAt,
    commentableType,
    postId,
    userId,
  } = item;

  const { isPostAuthor, dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);

  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleCollapse = () => {
    setOpened(!opened);
  };

  const handleEdit = function () {
    setEditing(!editing);
  };

  const handleDelete = function () {
    if(!window.confirm('Вы точно хотите удалить комментарий?')) {
      return;
    }

    blogService!
    .deleteComment(id)
    .then(() => {
      //dispatch(deleteEntity(config.entities.ADMIN_COMMENTS, id));
      dispatch(
        deleteEntity(
          config.entities.PUBLIC_COMMENTS_FOR_ENTITY(
            postId,
            CommentTypes.POST
          ),
          id
        )
      );
    })
    .catch((err) => alert("Не удалось удалить комментарий"));
  };

  const renderEditButton = () => {
    if (!isPostAuthor(userId)) {
      return null;
    }
    return (
      <button className="btn btn-sm btn-outline-secondary" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
    );
  };

  const renderDeleteButton = () => {
    if (!isPostAuthor(userId)) {
      return null;
    }
    return (
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  };

  return (
    <div className="comments-tree-item border mb-2">
      <div className="comments-tree-item-toolbar p-2">
        {renderEditButton()}{" "}
        <span className="ml-1">{renderDeleteButton()}</span>
      </div>

      <div className="comments-tree-item-body p-2">
        <PublishMeta meta={{ user: author, createdAt }} />
        {!editing ? (
          <div
            className="comments-tree-item-content mb-3"
            dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(content) }}
          />
        ) : (
          <CommentsForm
            commentId={id}
            commentableId={postId}
            commentableType={commentableType}
            parentId={id}
            handleCollapse={handleEdit}
            content={content}
          />
        )}

        {!opened ? (
          <div className="comments-tree-item-actions d-flex">
            {/*<button
              type="button"
              className="btn btn-sm btn-link text-decoration-none ml-auto"
              onClick={handleCollapse}
            >
              Ответить
            </button>*/}
          </div>
        ) : (
          <CommentsForm
            commentableId={postId}
            commentableType={commentableType}
            parentId={id}
            handleCollapse={handleCollapse}
          />
        )}
      </div>
    </div>
  );
};

export default CommentsTreeItem;
