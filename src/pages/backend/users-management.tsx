import React, { useContext } from 'react';
import config from '../../config';
import EntitiesContainer from "../../containers/entities-container";
import { BlogServiceContext } from "../../context";
import UsersTable from "../../components/backend/users-table";

const UsersManagement = () => {
    const blogService = useContext(BlogServiceContext);
    return (
        <div>
            <h1>Управление пользователями</h1>
            <EntitiesContainer entityKey={config.entities.ADMIN_USERS} endpoint={blogService!.getUsers}>
                {(items) => <UsersTable items={items} />}
            </EntitiesContainer>
        </div>
    )
}

export default UsersManagement
