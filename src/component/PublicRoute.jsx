import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const currentUser = useSelector((state) => state.authentication.loggedIn);
  console.log(currentUser);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        currentUser && restricted ? (
          <Redirect to="/Home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
