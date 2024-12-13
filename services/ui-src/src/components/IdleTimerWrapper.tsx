import React, { useState, useEffect } from "react";
import { useIdleTimer, IIdleTimer } from "react-idle-timer";
import jwt_decode from "jwt-decode";
import { logout } from "../libs/logoutLib";
import { useAppContext } from "../libs/contextLib";
import { clearTableStateStorageKeys } from "../utils/StorageKeys";

const IdleTimerWrapper = () => {
  const STORAGE_KEY: string = "accessToken";
  const TOTAL_TIMEOUT_TIME: number = 60 * 60 * 1000; // default of 1 hour total
  const PROMPT_TIME: number = 45 * 60 * 1000; // default of 45 minutes to warning
  const LOGOUT_TIME: number = 15 * 60 * 1000 - 5000; // default logout 15 minutes after warning
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
        onIdle
      );
  };

  const onIdle = () => {
    clearTableStateStorageKeys();
    logout();
  };

  const idleTimer: IIdleTimer = useIdleTimer({
    onPrompt,
    onIdle,
    timeout: promptTimeout,
    promptTimeout: logoutTimeout,
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
  }, [isAuthenticated, promptTimeout, logoutTimeout]);

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

    // time is already less then the prompt time - inform user they are low on time
    if (timeLeft <= LOGOUT_TIME) {
      setPromptTimeout(0);
      setLogoutTimeout(timeLeft);
      return;
    }

    setPromptTimeout(PROMPT_TIME - timeLoggedIn);
  };

  return <></>;
};

export default IdleTimerWrapper;
