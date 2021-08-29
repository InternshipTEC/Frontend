import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!localStorage.getItem("user") ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute
