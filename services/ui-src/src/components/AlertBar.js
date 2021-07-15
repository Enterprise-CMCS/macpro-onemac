import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alertMessage, ALERTS_MSG } from "../libs/alert-messages";
import { Alert } from "@cmsgov/design-system";
import { getAlert } from "../libs/error-mappings";
import closingX from "../images/AlertClosingX.svg";
import { RESPONSE_CODE } from "cmscommonlib";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {Object} formInfo - all the change request details specific to this submission
 * @param {String} changeRequestType - the type of change request
 */
const AlertBar = ({ alertCode, personalizedString = "", closeCallback }) => {
  const [alert, setAlert] = useState(getAlert(alertCode));

  useEffect(() => {
    let mounted = true;
    console.log("alertCode is: ", alertCode);
    if (alertCode && mounted)
      if (alertCode === RESPONSE_CODE.LOGIN_ERROR)
        setAlert(alertMessage[RESPONSE_CODE.LOGIN_ERROR]);
      else setAlert(getAlert(alertCode));

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

AlertBar.propTypes = {
  alertCode: PropTypes.string,
  personalizedString: PropTypes.string,
};

export default AlertBar;
