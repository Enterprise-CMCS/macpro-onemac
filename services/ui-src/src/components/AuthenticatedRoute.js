import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { ROUTES } from "cmscommonlib";
import { Auth } from "aws-amplify";
import UserDataApi from "../utils/UserDataApi";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();
  const history = useHistory();

  async function checkRoute() {
    let isValidURLPath = false;
    const authUser = await Auth.currentAuthenticatedUser();
    const email = authUser.signInUserSession.idToken.payload.email;
    const userData = await UserDataApi.userProfile(email);

    if (userData.type !== undefined && userData.validRoutes !== undefined) {
      const roleRoutes = userData.validRoutes;

      // Loop check for allowed route base path
      roleRoutes.forEach(checkBaseURLPath);

      function checkBaseURLPath(item) {
        let currentPath = document.location.pathname.substring(0, item.length);
        if (item === currentPath) {
          isValidURLPath = true;
        }
      }
      if (!isValidURLPath) {
        history.push(ROUTES.HOME);
        return;
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    checkRoute();
    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    }
    return function cleanup() {
      mounted = false;
    };
  });

  return <Route {...rest}>{isAuthenticated ? children : <div></div>}</Route>;
}
