import React, { useState, useEffect } from "react";
import { Alert } from "@cmsgov/design-system";
import { alertCodeAlerts, ALERTS_MSG } from "../libs/alertLib";
import closingX from "../images/AlertClosingX.svg";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

const AlertBar: React.FC<{
  alertCode?: string;
  personalizedString?: string;
  closeCallback?: () => void;
}> = ({ alertCode, personalizedString = "", closeCallback }) => {
  const [alert, setAlert] = useState(alertCodeAlerts[alertCode ?? ""]);

  useEffect(() => {
    let mounted = true;

    if (alertCode && mounted) setAlert(alertCodeAlerts[alertCode]);

    return function cleanup() {
      mounted = false;
    };
  }, [alertCode]);

  useEffect(() => {
    let mounted = true;

    if (mounted && alert && alert.heading && alert.heading !== "") {
      var elmnt = document.getElementById("alert-bar");
      if (elmnt) elmnt.scrollIntoView({ behavior: "smooth" });
    }

    return function cleanup() {
      mounted = false;
    };
  }, [alert, personalizedString]);

  const renderText = () => {
    let newText = alert.text.replace("$personalize$", personalizedString);
    if (alert?.linkURL && alert?.linkText) {
      let parts = newText.split("$Link$");
      let theLink = (
        <a href={alert.linkURL} target="_blank" rel="noopener noreferrer">
          {alert.linkText}
        </a>
      );
      return (
        <>
          {parts[0].toString()}
          {theLink}
          {parts[1].toString()}
        </>
      );
    } else {
      return newText;
    }
  };

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return alertCode && alert && alert.heading && alert.heading !== "" ? (
    <div className="alert-bar" id="alert-bar">
      <Alert variation={alert.type} heading={alert.heading}>
        <p className="ds-c-alert__text">{renderText()}</p>
        <button
          aria-label={"Dismiss alert"}
          className="close-button"
          onClick={() => {
            setAlert(ALERTS_MSG.NONE);
            if (closeCallback) closeCallback();
          }}
        >
          {CLOSING_X_IMAGE}
        </button>
      </Alert>
    </div>
  ) : null;
};

export default AlertBar;
