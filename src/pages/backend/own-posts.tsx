import React, { useContext } from 'react'
import config from '../../config';
import { PostsListContainer } from '../../containers';
import { BlogServiceContext } from "../../context";

const OwnPosts = () => {
    const blogService = useContext(BlogServiceContext);
    return (
        <div>
            <h1>Мои посты</h1>
            <PostsListContainer entityKey={config.entities.OWN_POSTS} endpoint={blogService!.getOwnPosts}/>
        </div>
    )
}

export default OwnPosts
