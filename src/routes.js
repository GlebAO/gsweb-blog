import React from 'react';

const PostsPage = React.lazy(() => import('./pages/posts-page'));
const PostPage = React.lazy(() => import('./pages/post-page'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: PostsPage },
    { path: '/post/:slug', exact: true, name: 'Post page', component: PostPage },
]

export default routes;