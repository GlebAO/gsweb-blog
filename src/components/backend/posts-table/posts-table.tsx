import React from "react";
import PostModel from "../../../types/PostModel";
import PostStatusDropdown from "./post-status-dropdown";

interface PostsTableInterface {
  items: PostModel[];
}

const PostsTableRow: React.FC<{ item: PostModel }> = ({ item }) => {
  const { title, user, status, createdAt, updatedAt, tags } = item;
  return (
    <>
      <td>{title}</td>
      <td>{user && user.name}</td>
      <td>{tags && tags.map(tag=>tag.title).join(', ')}</td>
      <td>
        <PostStatusDropdown currentStatus={status} post={item} />
      </td>
      <td>{updatedAt}</td>
      <td>{createdAt}</td>
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
