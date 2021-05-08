import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ALERTS_MSG } from "../libs/alert-messages";
import { Alert } from "@cmsgov/design-system";
import { getAlert } from "../libs/error-mappings";
import closingX from "../images/AlertClosingX.svg";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {Object} formInfo - all the change request details specific to this submission
 * @param {String} changeRequestType - the type of change request
 */
const KristinAlertBar = ({ alertCode, personalizedString = "" }) => {
  const [alert, setAlert] = useState(getAlert(alertCode));

  useEffect(() => {
    let mounted = true;

    if (alertCode && mounted) setAlert(getAlert(alertCode));

    return function cleanup() {
      mounted = false;
    };
  }, [ alertCode ] );

  useEffect(() => {
    let mounted = true;
    if (mounted && alert && alert.heading && alert.heading !== "") {
        var elmnt = document.getElementById("alert-bar");
        if (elmnt) elmnt.scrollIntoView({behavior: 'smooth'});    
    }
    console.log("useEffect alert is: ", alert);
    return function cleanup() {
      mounted = false;
    };
  }, [ alert, personalizedString ]);

  const renderText=()=>{
    let newText = alert.text.replace("$personalize$", personalizedString);
    if (alert?.linkURL && alert?.linkText) {
      let parts = newText.split("$Link$");
      let theLink = (<a href={alert.linkURL} target="_blank" rel="noopener noreferrer">{alert.linkText}</a>);
      return <>{parts[0].toString()}{theLink}{parts[1].toString()}</>;
    } else{
      return newText;
    }
  }

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    alertCode && alert && alert.heading && alert.heading !== "" ?
    <div className="alert-bar" id="alert-bar">
      <Alert variation={alert.type} heading={alert.heading}>
        <p className="ds-c-alert__text" >{renderText()}</p>
        <button
          className="close-button"
          onClick={() => setAlert(ALERTS_MSG.NONE)}
        >
          {CLOSING_X_IMAGE}
        </button>
      </Alert>
    </div>
    : null
  );
};

KristinAlertBar.propTypes = {
  alertCode: PropTypes.string,
  personalizedString: PropTypes.string,
};

export default KristinAlertBar;
