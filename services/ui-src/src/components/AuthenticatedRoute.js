import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    let mounted = true;

    // Show a warning if the user has not logged in.
    if (!isAuthenticated && mounted) {
      AlertBar.alert(ALERTS_MSG.NOT_AUTHENTICATED);
    }
    return function cleanup() {
      mounted = false;
    }
  });

  return <Route {...rest}>{isAuthenticated ? children : <div></div>}</Route>;
}
