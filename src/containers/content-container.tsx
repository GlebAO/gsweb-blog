import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Spinner } from "../components/brand-logo";
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
                  render={props => (
                      <route.component {...props}/>
                  )}
                />
              )
            );
          })}
          <Redirect from="/" to="/404" />
        </Switch>
      </Suspense>
    </main>
  );
};

export default ContentContainer;
