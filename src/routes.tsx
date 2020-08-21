import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Spinner } from "./components/common/spinner";
import { AuthenticatedRoute } from "./components/hoc";

const PostsPage = React.lazy(() => import("./pages/post/posts-page"));
const PostPage = React.lazy(() => import("./pages/post/post-page"));
const Profile = React.lazy(() => import("./pages/profile"));
const CreatePostPage = React.lazy(() =>
  import("./pages/post/create-post-page")
);
const EditPostPage = React.lazy(() => import("./pages/post/edit-post-page"));

const Routes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/" exact component={PostsPage} />

        <AuthenticatedRoute path="/profile" exact component={Profile} />
        
        <AuthenticatedRoute
          path="/post/create"
          exact
          component={CreatePostPage}
        />
        <AuthenticatedRoute
          path="/post/edit/:slug"
          exact
          component={EditPostPage}
        />

        <Route path="/post/:slug" exact component={PostPage} />

        <Redirect from="/" to="/404" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
