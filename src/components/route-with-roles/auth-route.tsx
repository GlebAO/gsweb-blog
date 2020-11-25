import React, { useContext } from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { AppContext } from "../../reducers/index";
import { RouteComponentProps } from "@reach/router";

interface AuthRouteProps {
    exact?: boolean;
    path: string;
    children: JSX.Element & RouteProps;
  }

const AuthRoute: React.FunctionComponent<AuthRouteProps & RouteComponentProps > = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const appContext = useContext(AppContext);

  return (
    <Route {...rest}>
      {appContext.isAuthenticated() ? (
        children
      ) : (
        <Redirect to={
          `/?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}

export default AuthRoute;