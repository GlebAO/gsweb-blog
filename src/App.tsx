import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "./components/common/spinner";
import { AppProvider } from "./reducers";
//import DummyBlogService from "./services/dummy-blog-service";
import BlogService from "./services/blog-service";
import AuthService from "./services/auth-service";
import { BlogServiceContext, AuthServiceContext } from "./context";
import ErrorBoundary from "./components/common/error-boundary";

import "./scss/style.scss";

// Containers
const LayoutContainer = React.lazy(() =>
  import("./containers/layout-container")
);

//Pages
const Page404 = React.lazy(() => import("./pages/404"));
const Signup = React.lazy(() => import("./pages/auth/signup"));
const Login = React.lazy(() => import("./pages/auth/login"));

const blogService = new BlogService();
const authService = new AuthService();

function App() {
  return (
    <AuthServiceContext.Provider value={authService}>
      <BlogServiceContext.Provider value={blogService}>
        <ErrorBoundary>
          <AppProvider>
            <Router>
              <React.Suspense fallback={<Spinner />}>
                <Switch>
                  <Route exact path="/404" render={() => <Page404 />} />
                  <Route exact path="/signup" render={() => <Signup />} />
                  <Route exact path="/login" render={() => <Login />} />
                  <Route path="/" render={() => <LayoutContainer />} />
                </Switch>
              </React.Suspense>
            </Router>
          </AppProvider>
        </ErrorBoundary>
      </BlogServiceContext.Provider>
    </AuthServiceContext.Provider>
  );
}

export default App;
