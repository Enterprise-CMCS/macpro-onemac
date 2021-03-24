import React, {useEffect, useState} from "react";
import { Route, useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "cmscommonlib";
import NotFound from "../containers/NotFound";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated, userProfile } = useAppContext();
  const [allowedRoute, setAllowedRoute] = useState( );
  const history = useHistory();

  async function validateUserRoute() {
    const { email } = userProfile;
    const userData = await ChangeRequestDataApi.userProfile(email);

    let currentPath = document.location.pathname

    if ( currentPath === "/") {
      setAllowedRoute(true)
    } else {
      if ( userData.validRoutes === undefined ) {
        window.location.reload()
      }

      const isValidRoute = userData.validRoutes.includes(currentPath)
      setAllowedRoute(isValidRoute)
      if ( ! isValidRoute )  window.location.reload()
    }
  }

  useEffect(() => {
    let mounted = true;

    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    }

    return function cleanup() {
      mounted = false;
      validateUserRoute(mounted)
    }
  });

  return <Route {...rest}>{isAuthenticated && allowedRoute ? children : <div></div>}</Route>;

}
