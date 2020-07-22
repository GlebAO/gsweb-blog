import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "./components/view";
import { Page404 } from "./components/pages";
import { AppProvider } from "./reducers";

import "./scss/style.scss";

// Containers
const LayoutContainer = React.lazy(() =>
  import("./containers/layout-container")
);

function App() {
  return (
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
  );
}

export default App;
