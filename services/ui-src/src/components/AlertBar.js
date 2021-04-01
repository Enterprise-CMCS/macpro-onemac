import React, { useEffect, useRef } from "react";
import { Alert } from "@cmsgov/design-system";
import { useHistory, useLocation } from "react-router-dom";

export const AlertBar = () => {
  const location = useLocation();
  const { state: { showAlert: alert } = {} } = location;
  const history = useHistory();

  // keep a handle on the alert bar's container
  const divRef = useRef();

  // track alert from global state (history) in a local mutable ref
  const alertRef = useRef(alert);

  // every time the alert from the browser location changes...
  useEffect(() => {
    // scroll the user up to the bar
    if (alertRef.current && divRef.current) {
      divRef.current.scrollIntoView();
    }

    // if the alert has changed to something other than null / false / etc.
    if (alert) {
      // update our local copy if it's different
      if (alert !== alertRef.current) alertRef.current = alert;

      // clear it out of the browser's location so we do not see it again on refresh
      history.replace({ ...location, state: undefined }, {
        ...location.state,
        showAlert: null,
      });
    }
  }, [alert, history, location]);

  return (
    <div className="alert-bar" ref={divRef}>
      {alertRef.current && alertRef.current.heading && (
        <Alert
          variation={alertRef.current.type}
          heading={alertRef.current.heading}
        >
          <p className="ds-c-alert__text">{alertRef.current.text}</p>
        </Alert>
      )}
    </div>
  );
};

