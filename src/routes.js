import React from 'react';

const PostsListContainer = React.lazy(() => import('./containers/posts-list-container'));
const PostContainer = React.lazy(() => import('./containers/post-container'));

const routes = [
    { path: '/', exact: true, name: 'Posts', component: PostsListContainer },
    { path: '/:post-slug', exact: true, name: 'Post content', component: PostContainer },
]

export default routes;