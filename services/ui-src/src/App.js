import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import Header from "./components/Header";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import UserDataApi from "./utils/UserDataApi";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isLoggedInAsDeveloper, developerLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    let userAuthenticationStatus = false;
    let isDev = false;
    let tmpUserProfile = {email:"", userData: ""};

    try {
      const authUser = await Auth.currentAuthenticatedUser();
      tmpUserProfile.email = authUser.signInUserSession.idToken.payload.email;
      userAuthenticationStatus = true;
      const userData = await UserDataApi.userProfile(tmpUserProfile.email);
      tmpUserProfile.userData = userData;
      if (userData.id === "user4@cms.hhs.local") isDev=true;
      userAuthenticationStatus = true;
    } catch (error) {
      if (error !== "not authenticated") {
        console.log(
          "There was an error while loading the user information.",
          error
        );
      }
    }
    setUserProfile(tmpUserProfile);
    userHasAuthenticated(userAuthenticationStatus);
    setIsAuthenticating(false);
    developerLoggedIn(isDev);
  }

  return (
    !isAuthenticating && (
      <div>
        <AppContext.Provider
          value={{ isLoggedInAsDeveloper, developerLoggedIn, isAuthenticated, userHasAuthenticated, userProfile, setUserProfile }}>
          <Header />
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
