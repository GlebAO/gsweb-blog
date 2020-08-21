import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../../reducers/index";

interface AuthRouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const AuthenticatedRoute = ({ component: Component, ...rest }: AuthRouteProps) => {
  const appContext = useAppContext();
  const { pathname, search } = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        appContext.isAuthenticated() ? <Component {...props}/> : <Redirect to={`/login?redirect=${pathname}${search}`} />
      }
    />
  );
};

export default AuthenticatedRoute;
