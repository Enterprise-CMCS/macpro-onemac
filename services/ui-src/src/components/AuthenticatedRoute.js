import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { ROUTES } from "cmscommonlib";
import {Auth} from "aws-amplify";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();
  const history = useHistory();

  async function checkRoute() {
    const authUser = await Auth.currentAuthenticatedUser();
    const email = authUser.signInUserSession.idToken.payload.email;
    const userData = await ChangeRequestDataApi.userProfile(email);

    if (userData.type !== undefined && userData.validRoutes !== undefined) {
      const roleRoutes = userData.validRoutes
      const baseRoute = document.location.pathname.split("#")
      // Not allowed if not in users list
      if (! roleRoutes.includes(baseRoute[0])) {
        history.push(ROUTES.HOME);
        return
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    checkRoute()
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
