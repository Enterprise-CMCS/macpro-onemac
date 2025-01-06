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
import {
  effectiveRoleForUser,
  getActiveTerritories,
  RESPONSE_CODE,
} from "cmscommonlib";
import IdleTimerWrapper from "./components/IdleTimerWrapper";
import { ConfirmationDialog } from "./components/ConfirmationDialog";

import NotificationBanner from "./components/NotificationBanner";
import NotificationsApi from "./utils/NotificationApi";
import { LOCAL_STORAGE_USERNOTIFICATIONS } from "./utils/StorageKeys";
import { useFlags } from "launchdarkly-react-client-sdk";

const DEFAULT_AUTH_STATE: Omit<
  AppContextValue,
  "setUserInfo" | "updatePhoneNumber" | "confirmAction"
> = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoggedInAsDeveloper: false,
  userProfile: {},
  userRole: null,
  userStatus: null,
  activeTerritories: null,
};

const App = () => {
  const [authState, setAuthState] = useState(DEFAULT_AUTH_STATE);
  const { mmdlNotification, enableSubsequentDocumentation } = useFlags();
  const [confirmationDialog, setConfirmationDialog] = useState<{
    heading: string;
    acceptText: string;
    cancelText: string;
    message: JSX.Element | string;
    onAccept: any;
    onDeny: any;
  } | null>(null);
  const closeConfirmationDialog = useCallback(
    () => setConfirmationDialog(null),
    []
  );

  const confirmAction = useCallback(
    async (
      heading: string,
      acceptText: string,
      cancelText: string,
      message: JSX.Element | string,
      onAccept: any,
      onDeny: any
    ) =>
      setConfirmationDialog({
        heading,
        acceptText,
        cancelText,
        message,
        onAccept,
        onDeny,
      }),
    []
  );

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
      const activeTerritories = getActiveTerritories(userData?.roleList);
      let oneMacIdmRoles;
      if (authUser.signInUserSession.idToken.payload["custom:cms_roles"])
        oneMacIdmRoles = authUser.signInUserSession.idToken.payload[
          "custom:cms_roles"
        ]
          .split(",")
          .filter(
            (role: string) =>
              role === "onemac-state-user" || role === "onemac-helpdesk"
          )
          .toString();
      setAuthState({
        ...DEFAULT_AUTH_STATE,
        isAuthenticating: false,
        isAuthenticated: true,
        // Set isDev for dev users.
        isLoggedInAsDeveloper: isDeveloper || devUsers.includes(email),
        userProfile: {
          email,
          ismemberof:
            authUser.signInUserSession.idToken.payload["custom:ismemberof"],
          cmsRoles: oneMacIdmRoles,
          firstName: authUser.signInUserSession.idToken.payload.given_name,
          lastName: authUser.signInUserSession.idToken.payload.family_name,
          // Get user data from the user table
          // and add to the user profile.
          // Note that userData comes back as an empty object if there is none.
          userData,
        },
        userRole,
        userStatus,
        activeTerritories,
      });
    } catch (error) {
      if (
        (error as string) !== "The user is not authenticated" &&
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

  useEffect(() => {
    (async () => {
      try {
        if (authState.isAuthenticated) {
          // set the notifications: Needs to be stored locally to persist on reload
          const email: any = authState.userProfile.email;
          let userData: any = authState.userProfile.userData;
          // Check local storage for notifications
          const storedNotifications = localStorage.getItem(
            LOCAL_STORAGE_USERNOTIFICATIONS
          );
          if (
            storedNotifications !== undefined &&
            storedNotifications?.length &&
            storedNotifications.length > 2
          ) {
            userData.notifications = JSON.parse(storedNotifications);
          } else {
            // get the notifications & set local storage
            let notifications = await NotificationsApi.createUserNotifications(
              email
            );
            // remove any MMDL notifications if flag is off
            if (notifications && !mmdlNotification) {
              notifications = notifications.filter(
                (notification) => !notification.header.includes("MMDL")
              );
            }

            // remove sub doc notifications if flag is off
            if (notifications && !enableSubsequentDocumentation) {
              notifications = notifications.filter(
                (notification) =>
                  !notification.body.includes("Upload Subsequent Documents")
              );
            }
            // set the notificationos
            if (notifications) {
              userData.notifications = notifications;
              localStorage.setItem(
                LOCAL_STORAGE_USERNOTIFICATIONS,
                JSON.stringify(notifications)
              );
              // set authState userData notifications
              setAuthState((prevState) => ({
                ...prevState,
                userProfile: {
                  ...prevState.userProfile,
                  userData: {
                    ...prevState.userProfile?.userData,
                    notifications: notifications,
                    roleList: prevState.userProfile?.userData?.roleList ?? [], // typescript UserProfile type def needs a value
                  },
                },
              }));
            }
          }
        }
      } catch (error) {
        console.log("There was an error retreiving notifications.", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isAuthenticated]);

  useEffect(() => {
    // On initial load of the App, try to set the user info.
    // It will capture info if they are logged in from a previous session.
    setUserInfo();
  }, [setUserInfo]);

  const { email, firstName, lastName, cmsRoles } = authState.userProfile;
  useEffect(() => {
    // When user's email or name changes, create a record of their info if it
    // does not already exist
    (async () => {
      if (email) {
        const retResponse = await UserDataApi.setContactInfo({
          email,
          firstName,
          lastName,
          cmsRoles,
        });
        if (retResponse === RESPONSE_CODE.USER_SUBMITTED) {
          await setUserInfo();
        }
      }
    })();
  }, [email, firstName, lastName, cmsRoles, setUserInfo]);

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
      confirmAction,
    }),
    [authState, setUserInfo, updatePhoneNumber, confirmAction]
  );

  const notifcations = useMemo(() => {
    if (authState.userProfile.userData?.notifications) {
      return authState.userProfile.userData?.notifications;
    } else return [];
  }, [authState.userProfile.userData]);

  return authState.isAuthenticating ? null : (
    <AppContext.Provider value={contextValue}>
      <IdleTimerWrapper />
      <div className="header-and-content">
        {notifcations.map((n) => (
          <NotificationBanner
            key={n.sk}
            {...n}
            userEmail={authState.userProfile.email ?? ""}
          />
        ))}
        <Header />
        <main id="main">
          <Routes />
          {confirmationDialog && (
            <ConfirmationDialog
              acceptText={confirmationDialog.acceptText}
              cancelText={confirmationDialog.cancelText}
              heading={confirmationDialog.heading}
              onAccept={() => {
                confirmationDialog.onAccept && confirmationDialog.onAccept();
                closeConfirmationDialog();
              }}
              onCancel={() => {
                confirmationDialog.onDeny && confirmationDialog.onDeny();
                closeConfirmationDialog();
              }}
            >
              {confirmationDialog.message}
            </ConfirmationDialog>
          )}
        </main>
      </div>
      <Footer />
    </AppContext.Provider>
  );
};
export default App;
