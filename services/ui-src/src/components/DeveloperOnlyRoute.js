import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { ROUTES } from "cmscommonlib";

export default function DeveloperOnlyRoute({ children, ...rest }) {
  const { isLoggedInAsDeveloper } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true; // Drop to home if user not logged in
    if (!isLoggedInAsDeveloper && mounted) {
      navigate(ROUTES.HOME);
    }
    return function cleanup() {
      mounted = false;
    };
  });

  return (
    <Route {...rest}>
      {isLoggedInAsDeveloper ? children : <div data-testid="emptyDiv"></div>}
    </Route>
  );
}
