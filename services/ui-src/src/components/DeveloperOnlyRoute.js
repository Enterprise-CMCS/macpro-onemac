import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useLoginTypeContext } from "../libs/contextLib";
import { ROUTES } from "../Routes";

export default function DeveloperOnlyRoute({ children, ...rest }) {
  const { isLoggedInAsDeveloper } = useLoginTypeContext();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;    // Drop to home if user not logged in
    if (!isLoggedInAsDeveloper && mounted) {
      history.push(ROUTES.HOME);
    }
    return function cleanup() {
      mounted = false;
    }
  });

  return <Route {...rest}>{isLoggedInAsDeveloper ? children : <div></div>}</Route>;
}
