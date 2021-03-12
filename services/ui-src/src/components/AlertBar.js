import React, { useEffect, useRef } from "react";
import { Alert } from "@cmsgov/design-system";
import { useLocation } from "react-router-dom";

export const AlertBar = () => {
  const { state: { showAlert: alert } = {} } = useLocation();
  const divRef = useRef();

  useEffect(() => {
    if (alert && divRef.current) {
      divRef.current.scrollIntoView();
    }
  }, [alert]);

  return (
    <div className="alert-bar" ref={divRef}>
      {alert && alert.heading && (
        <Alert variation={alert.type} heading={alert.heading}>
          <p className="ds-c-alert__text">{alert.text}</p>
        </Alert>
      )}
    </div>
  );
};
