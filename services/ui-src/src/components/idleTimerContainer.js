import React, { useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import jwt_decode from "jwt-decode";

const IdleTimerContainer = ({ isAuthenticated }) => {
  const LOCAL_STORAGE_KEY = "accessToken";
  const TOTAL_TIMEOUT_TIME = 60 * 60 * 1000; // default of 1 hour total
  const PROMPT_TIME = 45 * 60 * 1000; // default of 45 minutes to warning
  const LOGOUT_TIME = TOTAL_TIMEOUT_TIME - PROMPT_TIME; // default logout 15 minutes after warning

  const [promptTimeout, setPromptTimeout] = useState(PROMPT_TIME);
  const [logoutTimeout, setLogoutTimeout] = useState(LOGOUT_TIME);

  const onPrompt = () => {
    console.log("prompt is opened");
  };

  const onIdle = () => {
    console.log("logout occurs");
    // Do some idle action like log out your user
  };

  const idleTimer = useIdleTimer({
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
    setTimeoutTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const setTimeoutTimes = () => {
    const accessTokenKey = Object.keys(localStorage).filter((k) =>
      k.includes(LOCAL_STORAGE_KEY)
    );
    const loginToken = accessTokenKey
      ? localStorage.getItem(accessTokenKey)
      : null;
    if (!loginToken) return;

    const decodedToken = jwt_decode(loginToken);
    const epochAuthTime = decodedToken?.auth_time;
    if (!epochAuthTime) return;

    const authTime = new Date(epochAuthTime * 1000);
    const currentTime = new Date();
    const timeLoggedIn = currentTime - authTime; // in milliseconds
    const timeLeft = TOTAL_TIMEOUT_TIME - timeLoggedIn;

    // time has already expired for this session - logout user and redirect to home
    if (timeLeft <= 0) {
      onIdle();
      return;
    }

    // time is already less then the prompt time - inform user they are low on time
    if (timeLeft <= LOGOUT_TIME) {
      setPromptTimeout(0);
      setLogoutTimeout(timeLeft);
      idleTimer.start();
      onPrompt();
      return;
    }

    setPromptTimeout(PROMPT_TIME - timeLoggedIn);
    idleTimer.start();
  };

  return <></>;
};

export default IdleTimerContainer;
