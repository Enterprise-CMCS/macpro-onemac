import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import Header from "./components/Header";
import { AppContext } from "./libs/contextLib";
import {Auth} from "aws-amplify";
import ChangeRequestDataApi from "./utils/ChangeRequestDataApi";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userProfile = await ChangeRequestDataApi.userExists(user.signInUserSession.idToken.payload.email);
      console.log("xDEBUG: " + JSON.stringify(userProfile))
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== "not authenticated") {
        console.log(
            "There was an error while loading the user information.",
            error
        );
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div>
        <Header isAuthenticated={isAuthenticated} />
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
