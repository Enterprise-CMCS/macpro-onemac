import React, { useState, useEffect } from "react";
import { useIdleTimer, IIdleTimer } from "react-idle-timer";
import jwt_decode from "jwt-decode";
import { logout } from "../libs/logoutLib";
import { useAppContext } from "../libs/contextLib";
import { clearTableStateStorageKeys } from "../utils/StorageKeys";

const IdleTimerWrapper = () => {
  const STORAGE_KEY: string = "accessToken";
  const TOTAL_TIMEOUT_TIME: number = 60 * 60 * 1000; 
  const LOGOUT_TIME: number = 60 * 60 * 1000; // default of 1 hour until logout / timer idle
  const PROMPT_TIME: number = 15 * 60 * 1000 - 5000; // prompt user 15 minutes before logout
  /*
   * NB: the logout time is 5 seconds less than the backend timer to ensure
   * the logout occurs on the front end before the backend to avoid sync issues
   */


  const { confirmAction, isAuthenticated } = useAppContext() ?? {};
  const [promptTimeout, setPromptTimeout] = useState(PROMPT_TIME);
  const [logoutTimeout, setLogoutTimeout] = useState(LOGOUT_TIME);

  const onPrompt = () => {
    const minutesRemaining: number = Math.round(
      idleTimer.getRemainingTime() / 1000 / 60
    );
    const headerMessage: string = "Your Session is About to Expire";
    const bodyMessage: string =
      minutesRemaining > 1
        ? `Your session will end in about ${minutesRemaining} minutes`
        : `Your session will end in about one minute`;

    confirmAction &&
      confirmAction(
        headerMessage,
        "Logout",
        "Continue Browsing",
        bodyMessage,
        clickLogout,
        keepBrowsing,
      );
  };
  const onIdle = () => {
    clearTableStateStorageKeys();
    logout();
  };

  const clickLogout = () => {
    clearTableStateStorageKeys();
    logout();
  }
  const keepBrowsing = () => {
    if (!isAuthenticated) return;
    const tokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes(STORAGE_KEY)
    );
    const loginToken: string | null =
      tokenKey && localStorage.getItem(tokenKey[0]);
    if (!loginToken) return;

    const decodedToken: any = jwt_decode(loginToken);
    const accessExpTime: number | undefined = decodedToken?.exp;

    if (!accessExpTime) return;

    //Get the ammount of time until the token expires
    const expTime: number = new Date(accessExpTime * 1000).valueOf();
    const currentTime: number = new Date().valueOf();
    const timeAvailable: number = expTime - currentTime; // in milliseconds

    if (timeAvailable <= 0) {
      // tokens are already expired, will auto logout when timer idles
      return;
    }
    //reset idle timer to starting values
    idleTimer.reset()
    setPromptTimeout(PROMPT_TIME)
    setLogoutTimeout(LOGOUT_TIME)
    idleTimer.start();  
  }

  const idleTimer: IIdleTimer = useIdleTimer({
    onPrompt,
    onIdle,
    timeout: logoutTimeout, // Time until onIdle gets called which auto logs the user out
    promptBeforeIdle: Math.min(promptTimeout, logoutTimeout - 1), // Time before auto logout in which user prompted, default is promptTimeout, unless cross tab.
    events: [],
    element: document,
    startOnMount: false,
    startManually: true,
    stopOnIdle: true,
    crossTab: true,
    syncTimers: 0,
    leaderElection: true,
  });

  useEffect(() => {
    /*
     *this depends on isAuthenticated to ensure it starts the timer after logging in
     * this depends on promptTimeout and logoutTimeout
     * this is to ensure that the idleTimer has the most recent values for the times
     */
    if (isAuthenticated) {
      setTimeoutTimes();
      idleTimer.start();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const setTimeoutTimes = () => {
    if (!isAuthenticated) return;

    const tokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes(STORAGE_KEY)
    );

    const loginToken: string | null =
      tokenKey && localStorage.getItem(tokenKey[0]);
    if (!loginToken) return;

    const decodedToken: any = jwt_decode(loginToken);

    const epochAuthTime: number | undefined = decodedToken?.auth_time;

    if (!epochAuthTime) return;

    const authTime: number = new Date(epochAuthTime * 1000).valueOf();
    const currentTime: number = new Date().valueOf();
    const timeLoggedIn: number = currentTime - authTime; // in milliseconds
    const timeLeft: number = TOTAL_TIMEOUT_TIME - timeLoggedIn;

    // time has already expired for this session
    if (timeLeft <= 0) {
      // NB: possibly add logic to handle edge cases?
      return;
    }
    setLogoutTimeout(Math.max(LOGOUT_TIME - timeLoggedIn, 0));
    setPromptTimeout(Math.max(PROMPT_TIME, 0));

  };

  return <></>;
};

export default IdleTimerWrapper;
