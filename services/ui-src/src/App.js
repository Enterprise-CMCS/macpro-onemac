import React, { useState, useEffect } from "react";

import Routes from "./Routes";
import Header from "./components/Header";
import AlertBar from "./components/AlertBar";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";

import {Auth} from "aws-amplify";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  });

  async function onLoad() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      //
      // TODO: Update cognito to allow profile info
      //
      console.log(JSON.stringify(user.signInUserSession.idToken.payload.email))
      console.log(JSON.stringify(user.signInUserSession.idToken.payload.family_name))
      console.log(JSON.stringify(user.signInUserSession.idToken.payload.given_name))
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        setIsAuthenticating(false);
        console.log(
            "There was an error while loading the user information.",
            error
        );
      }
    }

    //setIsAuthenticating(false);
  }
  // Dismiss the alert when the page changes.
  useHistory().listen((location, action) => {
    AlertBar.dismiss();
  });

  return (
    !isAuthenticating && (
      <div>
        <Header isAuthenticated={isAuthenticated} />
        <div className="App container">
          <AlertBar />
          <AppContext.Provider
            value={{ isAuthenticated, userHasAuthenticated }}
          >
            <Routes />
          </AppContext.Provider>
        </div>
      </div>
    )
  );
}

export default App;
