import React from "react";
import { getProfile, isLoggedIn } from "../utils";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles = null, ...rest }) => {
  const auth = (props) => {
    const profile = getProfile();
    const isLogged = isLoggedIn();

    if (isLogged) {
      if (roles) {
        for (const role of roles) {
          if (profile.user_claims.role === role) {
            return <Component {...props} />;
          }
        }
        return <Redirect to="/not_allowed" />;
      } else {
        return <Component {...props} />;
      }
    } else {
      return <Redirect to="/not_allowed" />;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return auth(props);
      }}
    />
  );
};

export default PrivateRoute;
