import React, { useState, useEffect } from "react";

import Routes from "./Routes";
import Header from "./components/Header";
import AlertBar from "./components/AlertBar";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";

import {checkUser} from "./utils/auth-utils";
import {Auth} from "aws-amplify";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  });

  async function onLoad() {

    const user = await checkUser()
    if (user.authenticated) {
      const data = await Auth.currentAuthenticatedUser();
      console.log("DEBUG Current:" + JSON.stringify(data))
      setIsAuthenticating(false)
      console.log("Debug checkuser:" + JSON.stringify(user))
    } else {
      setIsAuthenticating(false)
    }
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
