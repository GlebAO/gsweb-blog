import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "./components/common/brand-logo";
import { AppProvider } from "./reducers";
//import DummyBlogService from "./services/dummy-blog-service";
import BlogService from "./services/blog-service";
import AuthService from "./services/auth-service";
import { BlogServiceContext, AuthServiceContext } from "./context";

import "./scss/style.scss";

// Containers
const LayoutContainer = React.lazy(() =>
  import("./containers/layout-container")
);

//Pages
const Page404 = React.lazy(() => import("./pages/404"));
const Signup = React.lazy(() => import("./pages/signup"));

const blogService = new BlogService();
const authService = new AuthService();

function App() {
  return (
    <AuthServiceContext.Provider value={authService}>
      <BlogServiceContext.Provider value={blogService}>
        <AppProvider>
          <Router>
            <React.Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path="/404" render={() => <Page404 />} />
                <Route exact path="/signup" render={() => <Signup />} />
                <Route path="/" render={() => <LayoutContainer />} />
              </Switch>
            </React.Suspense>
          </Router>
        </AppProvider>
      </BlogServiceContext.Provider>
    </AuthServiceContext.Provider>
  );
}

export default App;
