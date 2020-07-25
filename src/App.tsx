import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "./components/view";
import { AppProvider } from "./reducers";
import DummyService from "./services/dummy-blog-service";
import BlogServiceContext from "./components/blog-service-context";

import "./scss/style.scss";

// Containers
const LayoutContainer = React.lazy(() =>
  import("./containers/layout-container")
);

//Pages
const Page404 = React.lazy(() => import("./components/pages/404"));

const blogService = new DummyService();

function App() {
  return (
    <BlogServiceContext.Provider value={blogService}>
      <AppProvider>
        <Router>
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/404" render={() => <Page404 />} />
              <Route path="/" render={() => <LayoutContainer />} />
            </Switch>
          </React.Suspense>
        </Router>
      </AppProvider>
    </BlogServiceContext.Provider>
  );
}

export default App;
