import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useSelector((state) => state.authentication.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
