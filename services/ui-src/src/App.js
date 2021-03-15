import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { AppContext } from "./libs/contextLib";
import { devUsers } from "./libs/devUsers";
import ChangeRequestDataApi from "./utils/ChangeRequestDataApi";
import Routes from "./Routes";
import Header from "./components/Header";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isLoggedInAsDeveloper, setIsLoggedInAsDeveloper] = useState(false);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    // On initial load of the App, try to set the user info.
    // It will capture info if they are logged in from a previous session.
    setUserInfo();
  }, []);

  async function setUserInfo(isDeveloper = false) {
    let userAuthenticationStatus = false;
    let isDev = false;
    let tempUserProfile;

    try {
      // Get authenticated user's info from cognito
      // and set portion of the user profile.
      const authUser = await Auth.currentAuthenticatedUser();
      userAuthenticationStatus = true;
      tempUserProfile = {
        email: authUser.signInUserSession.idToken.payload.email,
        firstName: authUser.signInUserSession.idToken.payload.given_name,
        lastName: authUser.signInUserSession.idToken.payload.family_name,
      };

      // Get user data from the user table
      // and add to the user profile.
      // Note that userData comes back as an empty object if there is none.
      const userData = await ChangeRequestDataApi.userProfile(tempUserProfile.email);
      tempUserProfile.userData = userData;

      // Set isDev for dev users.
      if (isDeveloper || devUsers.includes(tempUserProfile.email)) {
        isDev = true;
      }
    } catch (error) {
      if (error !== "not authenticated") {
        console.log(
          "There was an error while loading the user information.",
          error
        );
      }
    }

    setIsAuthenticating(false);
    userHasAuthenticated(userAuthenticationStatus);
    setIsLoggedInAsDeveloper(isDev);
    setUserProfile(tempUserProfile);
  }

  return (
    !isAuthenticating && (
      <div>
        <AppContext.Provider
          value={{
            isLoggedInAsDeveloper,
            isAuthenticated,
            userProfile,
            setUserInfo,
          }}
        >
          <Header />
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
