import React, { useState, useEffect } from "react";
import { useIdleTimer, IIdleTimer } from "react-idle-timer";
import jwt_decode from "jwt-decode";
import { logout, getNewSession } from "../libs/logoutLib";
import { useAppContext } from "../libs/contextLib";
import { clearTableStateStorageKeys } from "../utils/StorageKeys";

const IdleTimerWrapper = () => {
  const STORAGE_KEY: string = "accessToken";
  const TOTAL_TIMEOUT_TIME: number = 60 * 7 * 1000; // default of 1 hour total
  const PROMPT_TIME: number = 5 * 60 * 1000; // default of 45 minutes to warning
  const LOGOUT_TIME: number = 2 * 60 * 1000 - 5000; // default logout 15 minutes after warning
  /*
   * NB: the logout time is 5 seconds less than the backend timer to ensure
   * the logout occurs on the front end before the backend to avoid sync issues
   */

  const { confirmAction, isAuthenticated, isLoggedInAsDeveloper } =
    useAppContext() ?? {};
  const [promptTimeout, setPromptTimeout] = useState(PROMPT_TIME);
  const [logoutTimeout, setLogoutTimeout] = useState(LOGOUT_TIME);
  const [extendSession, setExtendSession] = useState(false);
  const [jwt, setJwt] = useState("")

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
  // acceptText: string,
  // cancelText: string,
  // onAccept?: any,
  // onDeny?: any
  const onIdle = () => {
    clearTableStateStorageKeys();
    logout();
  };

  const clickLogout = () => {
    clearTableStateStorageKeys();
    logout();
  }
  const keepBrowsing = () => {
    console.log("keep browsing")
    if (!isAuthenticated) return;
    const tokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes(STORAGE_KEY)
    );
    const loginToken: string | null =
      tokenKey && localStorage.getItem(tokenKey[0]);
    if (!loginToken) return;

    const decodedToken: any = jwt_decode(loginToken);
    const accessExpTime: number | undefined = decodedToken?.exp
    ;

    console.log("decodedToken", decodedToken)
    console.log("decodedToken", String(decodedToken))
    console.log("decodedToken?.auth_time;", decodedToken?.auth_time)

    if (!accessExpTime) return;

    const expTime: number = new Date(accessExpTime * 1000).valueOf();
    const currentTime: number = new Date().valueOf();
    const timeAvailable: number = expTime - currentTime; // in milliseconds
    // const timeLeft: number = TOTAL_TIMEOUT_TIME - timeLoggedIn;

    // time has already expired for this session
    if (timeAvailable <= 0) {
      // NB: possibly add logic to handle edge cases?
      return;
    }
    console.log("get new session in "+ timeAvailable + "milliseconds" ) 
    console.log("get new session in "+ (timeAvailable/1000)/60 + "minutes" ) 
    setLogoutTimeout(timeAvailable)
    setPromptTimeout(timeAvailable)
    setExtendSession(true)


    // setInterval(()=>{
    //   console.log("set  Interval called ");
    //   const accessToken = getNewSession();
    //   if()
  

    //   }
    // , 60000*5)
  }

  const idleTimer: IIdleTimer = useIdleTimer({
    onPrompt,
    onIdle,
    timeout: promptTimeout + 1000, // Ensure promptTimeout < timeout
    promptTimeout: logoutTimeout, // logoutTimeout should still be before actual logout
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
    console.log("use effect is auth")
    console.log("promptTimeout: " + promptTimeout)
    console.log("logoutTimeout: " + logoutTimeout)
    /*
     *this depends on isAuthenticated to ensure it starts the timer after logging in
     * this depends on promptTimeout and logoutTimeout
     * this is to ensure that the idleTimer has the most recent values for the times
     */
    // if (isAuthenticated && !isLoggedInAsDeveloper) {
    if (isAuthenticated && isLoggedInAsDeveloper) {
      console.log("logged in as a developer")
      // console.log("Time ")
      setTimeoutTimes();
      idleTimer.start();
      setInterval(() => {
        console.log("Hello, World!");
        console.log("remaining time: " +   idleTimer.getRemainingTime() / 1000 / 60 + " minutes")
      }, 5000);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(()=>{
    if (isAuthenticated && extendSession && jwt!=="") {
      const id = setInterval(()=>{
        getNewSession();
        console.log("get New Session")
        const tokenKey: string[] = Object.keys(localStorage).filter((k) =>
          k.includes(STORAGE_KEY)
        );
        const loginToken: string | null =
          tokenKey && localStorage.getItem(tokenKey[0]);
        if (!loginToken) return;
        if(jwt !== tokenKey[0]) {
        console.log("new tokens identified")
        setExtendSession(false)
        setTimeoutTimes();
        clearInterval(id);
        }
      }, 60000*5)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[extendSession, isAuthenticated, jwt])



  const setTimeoutTimes = () => {
    if (!isAuthenticated) return;

    const tokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes(STORAGE_KEY)
    );
    const loginToken: string | null =
      tokenKey && localStorage.getItem(tokenKey[0]);
    if (!loginToken) return;

    setJwt(loginToken);

    const decodedToken: any = jwt_decode(loginToken);
    const epochAuthTime: number | undefined = decodedToken?.auth_time;

    console.log("decodedToken", decodedToken)
    console.log("decodedToken", String(decodedToken))
    console.log("decodedToken?.auth_time;", decodedToken?.auth_time)

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

    // Adjust timeout times
    if (timeLeft <= LOGOUT_TIME) {
      setPromptTimeout(0); // if less than logout time, no need for a prompt
      console.log("timeleft < Lougout_time")
      setLogoutTimeout(timeLeft);
    } else {
      setPromptTimeout(Math.max(PROMPT_TIME - timeLoggedIn, 0));
      setLogoutTimeout(Math.max(LOGOUT_TIME, 0));
    }
  };

  return <></>;
};

export default IdleTimerWrapper;
