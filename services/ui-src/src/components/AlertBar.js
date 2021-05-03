import React, { useEffect, useRef }from "react";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import { ALERTS_MSG } from "../libs/alert-messages";

export const AlertBar = () => {
  const { currentAlert, setCurrentAlert } = useAppContext();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCurrentAlert(ALERTS_MSG.NONE);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }


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
    <div className="alert-bar" id="alert-bar" ref={wrapperRef}>
    <Alert variation={currentAlert.type} heading={currentAlert.heading}>
      <p className="ds-c-alert__text">{currentAlert.text}</p>
    </Alert>
  </div>
  );
};


