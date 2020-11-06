import React from "react";
import { useAppContext } from "../../../reducers";
import PostModel from "../../../types/PostModel";
import { getFormattedDateTime } from "../../../utils/date-utils";
import PostStatusDropdown from "./post-status-dropdown";

interface PostsTableInterface {
  items: PostModel[];
}

const PostsTableRow: React.FC<{ item: PostModel }> = ({ item }) => {
  const { title, user, status, userId, createdAt, updatedAt, tags } = item;
  const { getUserInfo } = useAppContext();
  const { sub: currentUserId } = getUserInfo();

  const isOwner = userId === currentUserId;

  return (
    <>
      <td>
        <strong>{title}</strong>{" "}
        {isOwner && (
          <p className="p-0 m-0">
            <span className="text-success text-sm">Ваш пост</span>
          </p>
        )}
      </td>
      <td>{user && user.name}</td>
      <td>{tags && tags.map((tag) => tag.title).join(", ")}</td>
      <td>
        <PostStatusDropdown currentStatus={status} post={item} />
      </td>
      <td>{getFormattedDateTime(updatedAt)}</td>
      <td>{getFormattedDateTime(createdAt)}</td>
    </>
  );
};

const PostsTable: React.FC<PostsTableInterface> = ({ items }) => {
  return (
    <table className="table table-responsive table-hover">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Автор</th>
          <th scope="col">Тэги</th>
          <th scope="col">Статус</th>
          <th scope="col">Updated at</th>
          <th scope="col">Created at</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item: PostModel) => {
          return (
            <tr key={item.id}>
              <PostsTableRow item={item} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PostsTable;
