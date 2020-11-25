import React, { useContext } from 'react';
import config from '../../config';
import EntitiesContainer from "../../containers/entities-container";
import { BlogServiceContext } from "../../context";
import TagsTable from "../../components/backend/tags-table";

const TagsManagement = () => {
    const blogService = useContext(BlogServiceContext);
    return (
        <div>
            <h1>Управление тэгами</h1>
            <EntitiesContainer entityKey={config.entities.ADMIN_TAGS} endpoint={blogService!.getTags}>
                {(items) => <TagsTable items={items} />}
            </EntitiesContainer>
        </div>
    )
}

export default TagsManagement