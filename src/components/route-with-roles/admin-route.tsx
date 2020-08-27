import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../../reducers/index";

interface AdminRouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const appContext = useAppContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        appContext.isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/backend/profile" />
        )
      }
    />
  );
};

export default AdminRoute;
