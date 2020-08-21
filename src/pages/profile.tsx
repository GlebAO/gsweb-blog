import React, { useContext } from "react";
import { AppContext } from "../reducers";
import { logout } from "../actions/auth/actions";

const Profile = () => {
  const { dispatch, getUserInfo } = useContext(AppContext);

  const { name, email, role } = getUserInfo();

  return (
    <div className="profile">
      <h1 className="h3">Личный кабинет</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-header">Профиль</div>
            <div className="card-body">
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
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => dispatch(logout())}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Profile;
