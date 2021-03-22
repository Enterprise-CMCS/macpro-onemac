import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { ROUTES } from "../Routes";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated, userProfile } = useAppContext();
  const { email } = userProfile;
  const history = useHistory();

  async function validateUserRoute() {
    const userData = await ChangeRequestDataApi.userProfile(email);

    console.log("User Data: " + JSON.stringify(userData))
    console.log("User Profile:(" + JSON.stringify(userProfile) + ")")
    console.log("User EMAIL:(" + JSON.stringify(email) + ")")
    console.log("User ROLE: " + JSON.stringify(userData.type))
    if (userData.type === "stateadmin") {
        console.log("validateUserRoute:(" + document.location + ") for Role: STATE ADMIN")
    } else if (userData.type === "stateuser") {
      console.log("validateUserRoute:(" + document.location + ") for ROLE STATE USER")
    } else if (userData.type === "cmsapprover") {
      console.log("validateUserRoute:(" + document.location + ") for ROLE  STATE CMS APPROVER")
    } else if (userData.type === "systemadmin") {
      console.log("validateUserRoute:(" + document.location + ") for ROLE  SYSTEM ADMIN")
    } else if (userData.type === "unknown") {
      console.log("validateUserRoute:(" + document.location + ") for ROLE UKNOWN")
      history.push(ROUTES.HOME);
    }

  }

  useEffect(() => {
    let mounted = true;

    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    } else {
      // Get user data from the user table
      // and add to the user profile.
      // Note that userData comes back as an empty object if there is none.
      validateUserRoute();
    }
    return function cleanup() {
      mounted = false;
    }
  });

  return <Route {...rest}>{isAuthenticated ? children : <div></div>}</Route>;
}
