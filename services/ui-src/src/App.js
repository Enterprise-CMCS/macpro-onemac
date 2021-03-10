import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import Header from "./components/Header";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import ChangeRequestDataApi from "./utils/ChangeRequestDataApi";

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
    let userProfile;

    try {
      const authUser = await Auth.currentAuthenticatedUser();
      userAuthenticationStatus = true;
      const userData = await ChangeRequestDataApi.userProfile(authUser.signInUserSession.idToken.payload.email);
      console.log("authUser is :", authUser);
      console.log("userData is :", userData);
      if (userData.isDev === "true") isDev=true;
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== "not authenticated") {
        console.log(
          "There was an error while loading the user information.",
          error
        );
      }
    }
    setUserProfile(userProfile);
    userHasAuthenticated(true);
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
