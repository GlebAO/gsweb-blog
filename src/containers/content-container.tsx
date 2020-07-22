import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Spinner } from "../components/view";
import routes from "../routes";

const ContentContainer = () => {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={() => (
                      <route.component />
                  )}
                />
              )
            );
          })}
        </Switch>
      </Suspense>
    </main>
  );
};

export default ContentContainer;
