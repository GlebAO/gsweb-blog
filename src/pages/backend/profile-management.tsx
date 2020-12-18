import React from "react";
import ProfileImage from "../../components/backend/profile-image";
import { useAppContext } from "../../reducers";

const ProfileManagement = () => {
  const { getUserInfo } = useAppContext();
  const { name, email, role } = getUserInfo();
  return (
    <div className="profile-management">
      <h1>Профиль</h1>
      <ul className="list-unstyled mb-3">
        <li>
          <strong>Имя:</strong> {name}
        </li>
        <li>
          <strong>Почта:</strong> {email}
        </li>
        <li>
          <strong>Роль:</strong> {role}
        </li>
      </ul>
      <div>
        <ProfileImage />
      </div>
    </div>
  );
};

export default ProfileManagement;
