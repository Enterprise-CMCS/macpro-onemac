import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { ROUTES } from "cmscommonlib";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    }
    return function cleanup() {
      mounted = false;
    }
  });

  return <Route {...rest}>{isAuthenticated ? children : <div></div>}</Route>;
}
