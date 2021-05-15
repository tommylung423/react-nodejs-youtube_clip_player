import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import ErrorBoundary from "./ErrorBoundary";
=======
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac

export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useSelector((state) => state.authentication.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
<<<<<<< HEAD
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
=======
          <Component {...props} />
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
