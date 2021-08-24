import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser, checkUser} = useContext(GlobalContext);
  React.useEffect(() => {
    checkUser()
  }, [])
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute