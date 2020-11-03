import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import Routes from "./Routes";
import Header from "./components/Header";
import AlertBar from "./components/AlertBar";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";
import PageTitleBar from "./components/PageTitleBar";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        console.log(
          "There was an error while loading the user information.",
          error
        );
      }
    }

    setIsAuthenticating(false);
  }

  // Dismiss the alert when the page changes.
  useHistory().listen((location, action) => {
    AlertBar.dismiss();
  });

  return (
    !isAuthenticating && (
      <div>
        <Header isAuthenticated={isAuthenticated} />
        <PageTitleBar />
        <AlertBar />
        <AppContext.Provider
          value={{ isAuthenticated, userHasAuthenticated }}
        >
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
