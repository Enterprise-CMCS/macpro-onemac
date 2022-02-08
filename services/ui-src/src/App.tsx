import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { set } from "lodash";

import { AppContextValue } from "./domain-types";
import { AppContext } from "./libs/contextLib";
import { devUsers } from "./libs/devUsers";
import UserDataApi from "./utils/UserDataApi";
import { Routes } from "./Routes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { effectiveRoleForUser } from "cmscommonlib";

const DEFAULT_AUTH_STATE: Omit<
  AppContextValue,
  "setUserInfo" | "updatePhoneNumber"
> = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoggedInAsDeveloper: false,
  userProfile: {},
  userRole: null,
  userStatus: null,
};

export function App() {
  const [authState, setAuthState] = useState(DEFAULT_AUTH_STATE);

  /**
   * Gets authentication status for user,
   * gets user names and email from cognito
   * and associated user data from dynamo user table,
   * checks if user is a developer.
   * Then sets all these values in their corresponding state variables.
   * @param isDeveloper indicates if the user is a developer
   */
  const setUserInfo = useCallback(async (isDeveloper = false) => {
    try {
      // Get authenticated user's info from cognito
      // and set portion of the user profile.
      const authUser = await Auth.currentAuthenticatedUser();
      const email = authUser.signInUserSession.idToken.payload.email;
      const userData = await UserDataApi.userProfile(email);
      const roleResult = effectiveRoleForUser(userData?.roleList);
      let userRole = null,
        userStatus = null;
      if (roleResult) {
        userRole = roleResult[0];
        userStatus = roleResult[1];
      }

      setAuthState({
        ...DEFAULT_AUTH_STATE,
        isAuthenticating: false,
        isAuthenticated: true,
        // Set isDev for dev users.
        isLoggedInAsDeveloper: isDeveloper || devUsers.includes(email),
        userProfile: {
          email,
          cmsRoles:
            authUser.signInUserSession.idToken.payload["custom:cms_roles"],
          firstName: authUser.signInUserSession.idToken.payload.given_name,
          lastName: authUser.signInUserSession.idToken.payload.family_name,
          // Get user data from the user table
          // and add to the user profile.
          // Note that userData comes back as an empty object if there is none.
          userData,
        },
        userRole,
        userStatus,
      });
    } catch (error) {
      if (
        (error as string) !== "not authenticated" &&
        (error as Error).message !== "SESSION_EXPIRY"
      ) {
        console.log(
          "There was an error while loading the user information.",
          error
        );
      }

      setAuthState({
        ...DEFAULT_AUTH_STATE,
        isAuthenticating: false,
      });
    }
  }, []);

  useEffect(() => {
    // On initial load of the App, try to set the user info.
    // It will capture info if they are logged in from a previous session.
    setUserInfo();
  }, [setUserInfo]);

  const { email, firstName, lastName } = authState.userProfile;
  useEffect(() => {
    // When user's email or name changes, create a record of their info if it
    // does not already exist
    if (email) UserDataApi.setContactInfo({ email, firstName, lastName });
  }, [email, firstName, lastName]);

  /**
   * Updates phone number in the user profile,
   * @param phoneNumber is used to update the user profile
   */
  const updatePhoneNumber = useCallback(
    async (phoneNumber: string) =>
      setAuthState((currentState) =>
        set(currentState, "userProfile.userData.phoneNumber", phoneNumber)
      ),
    []
  );

  const contextValue = useMemo(
    () => ({
      ...authState,
      setUserInfo,
      updatePhoneNumber,
    }),
    [authState, setUserInfo, updatePhoneNumber]
  );

  return authState.isAuthenticating ? null : (
    <AppContext.Provider value={contextValue}>
      <div className="header-and-content">
        <Header />
        <Routes />
      </div>
      <Footer />
    </AppContext.Provider>
  );
}
