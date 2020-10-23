import React, { useContext } from "react";
import CommentModel, { CommentTypes } from "../../../types/CommentModel";
import DOMPurify from "dompurify";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../../reducers";
import config from "../../../config";
import { deleteEntity } from "../../../actions/manageEntity/actions";
import { BlogServiceContext } from "../../../context";

interface CommentsTableInterface {
  items: CommentModel[];
}

const CommentTableRow: React.FC<{ item: CommentModel }> = ({ item }) => {
  const { id, content, postId, createdAt, updatedAt, author } = item;
  const { dispatch } = useAppContext();
  const blogService = useContext(BlogServiceContext);

  const handleDelete = () => {
    if(!window.confirm('Вы точно хотите удалить комментарий?')) {
      return;
    }

    blogService!
      .deleteComment(id)
      .then(() => {
        dispatch(deleteEntity(config.entities.ADMIN_COMMENTS, id));
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
      .catch((err) => alert("error"));
  };

  return (
    <>
      <td>
        <div
          className="comments-tree-item-content mb-3"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </td>
      <td>{postId}</td>
      <td>{author.name}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
      <td>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </>
  );
};

const CommentsTable: React.FC<CommentsTableInterface> = ({ items }) => {
  return (
    <table className="table table-responsive table-hover">
      <thead>
        <tr>
          <th scope="col">Комментарий</th>
          <th scope="col">Пост</th>
          <th scope="col">Автор</th>
          <th scope="col">Создан</th>
          <th scope="col">Отредактирован</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item: CommentModel) => {
          return (
            <tr key={item.id}>
              <CommentTableRow item={item} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CommentsTable;
