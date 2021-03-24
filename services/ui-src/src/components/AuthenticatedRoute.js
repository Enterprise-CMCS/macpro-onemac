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
      setAllowedRoute(userData.validRoutes.includes(currentPath))
    }
  }

  useEffect(() => {
    let mounted = true;

    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    } else {
      validateUserRoute();
    }
    // Get user data from the user table
    // and add to the user profile.
    // Note that userData comes back as an empty object if there is none.


    return function cleanup() {
      mounted = false;
      validateUserRoute()
    }
  });

  if (allowedRoute) {
    return <Route {...rest}>{isAuthenticated && allowedRoute ? children : <div></div>}</Route>;
  } else {
    return  <Route {...rest}><NotFound/></Route>
  }

}
