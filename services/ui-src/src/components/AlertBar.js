import React, { useEffect } from "react";
import { Alert } from "@cmsgov/design-system";
import closingX from "../images/AlertClosingX.svg";
import { useAppContext } from "../libs/contextLib";
import { ALERTS_MSG } from "../libs/alert-messages";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

export const AlertBar = () => {
  const { currentAlert, setCurrentAlert } = useAppContext();

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById("alert-bar");
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    let mounted = true;
    if (
      mounted &&
      currentAlert &&
      currentAlert.heading &&
      currentAlert.heading !== ""
    ) {
      jumpToPageTitle();
      console.log("current Alert: ", currentAlert);
    }

    return function cleanup() {
      mounted = false;
    };
  }, [currentAlert]);

  if (!currentAlert.heading) return null;
  return (
    <div className="alert-bar" id="alert-bar">
      <Alert variation={currentAlert.type} heading={currentAlert.heading}>
        <p className="ds-c-alert__text">{currentAlert.text}</p>
        <button
          className="close-button"
          onClick={() => setCurrentAlert(ALERTS_MSG.NONE)}
        >
          {CLOSING_X_IMAGE}
        </button>
      </Alert>
    </div>
  );
};
