import React, { useEffect }from "react";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";

export const AlertBar = () => {
  const { currentAlert } = useAppContext();

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById("alert-bar");
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && currentAlert && currentAlert.heading && currentAlert.heading !== "") {
      jumpToPageTitle();
    }

    return function cleanup() {
      mounted = false;
    };
  }, [currentAlert]);

  if (!currentAlert.heading) return null;
  return (
    <div className="alert-bar" id="alert-bar" >
    <Alert variation={currentAlert.type} heading={currentAlert.heading}>
      <p className="ds-c-alert__text">{currentAlert.text}</p>
    </Alert>
  </div>
  );
};


