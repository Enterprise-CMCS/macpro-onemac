import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { Workflow } from "cmscommonlib";
import RequestTemporaryExtension from "../page/action/RequestTemporaryExtension";
import RespondToRAI from "../page/action/RespondToRAI";
import Withdraw from "../page/action/Withdraw";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setShowMenu) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowMenu]);
}

export default function ActionPopup({ theComponent, alertCallback }) {
  const [showMenu, setShowMenu] = useState(false);
  const availableActions =
    Workflow.ACTIONS[theComponent.componentType][theComponent.currentStatus];

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowMenu);

  const actionComponent = {
    [Workflow.PACKAGE_ACTION.WITHDRAW]: useCallback(
      () => (
        <Withdraw theComponent={theComponent} alertCallback={alertCallback} />
      ),
      [theComponent, alertCallback]
    ),
    [Workflow.PACKAGE_ACTION.RESPOND_TO_RAI]: useCallback(
      () => <RespondToRAI theComponent={theComponent} />,
      [theComponent]
    ),
    [Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION]: useCallback(
      () => <RequestTemporaryExtension theComponent={theComponent} />,
      [theComponent]
    ),
  };

  return (
    <>
      <Button
        aria-haspopup="true"
        key={`button-${theComponent.componentId}`}
        aria-label={`Actions for ${theComponent.componentId}`}
        className="popup-menu-button"
        data-testid="popup-menu-trigger"
        disabled={!availableActions || availableActions.length === 0}
        onClick={() => setShowMenu(!showMenu)}
        size="small"
        variation="transparent"
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </Button>
      {showMenu && (
        <div
          key={`menu-${theComponent.componentId}`}
          ref={wrapperRef}
          data-testid="action-popup"
          className="action-popup"
        >
          {availableActions.map((actionName, i) => (
            <div key={i}>
              {i !== 0 && <hr />}
              {actionComponent[actionName]()}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
