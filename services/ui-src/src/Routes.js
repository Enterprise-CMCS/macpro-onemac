import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "cmscommonlib";

import Home from "./containers/Home";
import FAQ from "./containers/FAQ";
import NotFound from "./containers/NotFound";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import DevLogin from "./containers/DevLogin";
import DynamicRoutes from "./DynamicRoutes";
import UserPage from "./containers/UserPage";
import { useAppContext } from "./libs/contextLib";

export default function Routes() {
  const { isAuthenticated } = useAppContext();

  return (
    <Switch>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <Route exact path={ROUTES.FAQ}>
        <FAQ />
      </Route>
      <UnauthenticatedRoute exact path={ROUTES.DEVLOGIN}>
        <DevLogin />
      </UnauthenticatedRoute>
      <Route exact path={ROUTES.PROFILE}>
        {isAuthenticated ? <UserPage /> : <div></div>}
      </Route>
      <DynamicRoutes />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
