import React from "react";

const PostsPage = React.lazy(() => import("./pages/posts-page"));
const PostPage = React.lazy(() => import("./pages/post-page"));
const Profile = React.lazy(() => import("./pages/profile"));

const routes = [
    { path: '/', exact: true, component: PostsPage },
    { path: '/profile', exact: true, component: Profile, type: "auth" },
]

export default routes;
