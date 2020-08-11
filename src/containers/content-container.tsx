import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Spinner } from "../components/common/brand-logo";
import { AuthenticatedRoute } from '../components/hoc';

const PostsPage = React.lazy(() => import("../pages/posts-page"));
const PostPage = React.lazy(() => import("../pages/post-page"));
const Profile = React.lazy(() => import("../pages/profile"));

const ContentContainer = () => {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={PostsPage} />
          <Route path="/post/:slug" exact component={PostPage} />
          <AuthenticatedRoute path="/profile" exact component={Profile} />

          <Redirect from="/" to="/404" />
        </Switch>
      </Suspense>
    </main>
  );
};

export default ContentContainer;
