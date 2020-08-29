import React from "react";
import UserModel from "../../types/UserModel";
import RoleDropdown from "./role-dropdown";
import StatusDropdown from "./status-dropdown";

import "./users-table.scss";

interface UserTableInterface {
  items: UserModel[];
}

const UserTableRow: React.FC<{ item: UserModel }> = ({ item }) => {
  const { id, name, email, role, status, createdAt, lastLoggedIn } = item;
  return (
    <>
      <td>{email}</td>
      <td>{name}</td>
      <td>
        <RoleDropdown currentRole={role} userId={id} />
      </td>
      <td>
        <StatusDropdown currentStatus={status} userId={id} />
      </td>
      <td>{new Date(createdAt).toUTCString()}</td>
      <td>{lastLoggedIn && new Date(lastLoggedIn * 1000).toUTCString()}</td>
      <td></td>
    </>
  );
};

const UserTable: React.FC<UserTableInterface> = ({ items }) => {
  return (
    <table className="table table-responsive table-hover">
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Имя</th>
          <th scope="col">Роль</th>
          <th scope="col">Статус</th>
          <th scope="col">Дата регистрации</th>
          <th scope="col">Заходил последний раз</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item: UserModel) => {
          return (
            <tr key={item.id}>
              <UserTableRow item={item} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
