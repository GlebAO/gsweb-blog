import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../../reducers/index";

interface AuthRouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const AuthenticatedRoute = ({ component: Component, ...rest }: AuthRouteProps) => {
  const appContext = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        appContext.isAuthenticated() ? <Component {...props}/> : <Redirect to="/" />
      }
    />
  );
};

export default AuthenticatedRoute;
