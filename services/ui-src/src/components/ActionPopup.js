import React, { useCallback, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { ONEMAC_ROUTES, Workflow, TYPE_TO_RAI_ROUTE } from "cmscommonlib";
import PackageAPI from "../utils/PackageApi";
import { useAppContext } from "../libs/contextLib";

const popupLabel = {
  [Workflow.PACKAGE_ACTION.WITHDRAW]: "Withdraw",
  [Workflow.PACKAGE_ACTION.RESPOND_TO_RAI]: "Respond to RAI",
  [Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION]:
    "Request Temporary Extension",
};

const idPre = {
  [Workflow.PACKAGE_ACTION.WITHDRAW]: "withdraw-action",
  [Workflow.PACKAGE_ACTION.RESPOND_TO_RAI]: "respond-rai-action",
  [Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION]:
    "request-temporary-extension-action",
};

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
  const { userProfile, confirmAction } = useAppContext() ?? {};
  const [showMenu, setShowMenu] = useState(false);
  const availableActions =
    Workflow.ACTIONS[theComponent.componentType][theComponent.currentStatus];

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowMenu);

  const toLink = {
    [Workflow.PACKAGE_ACTION.WITHDRAW]: ONEMAC_ROUTES.PACKAGE_LIST,
    [Workflow.PACKAGE_ACTION.RESPOND_TO_RAI]: {
      pathname: TYPE_TO_RAI_ROUTE[theComponent.componentType],
      state: {
        componentId: theComponent.componentId,
      },
    },
    [Workflow.PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION]: {
      pathname: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
      state: {
        parentId: theComponent.componentId,
        parentType: theComponent.componentType,
      },
    },
  };

  const onPopupActionWithdraw = useCallback(async () => {
    try {
      const resp = await PackageAPI.withdraw(
        userProfile.userData.fullName,
        userProfile.email,
        theComponent.componentId,
        theComponent.componentType
      );
      alertCallback(resp);
    } catch (e) {
      console.log("Error while updating package.", e);
      alertCallback(e.message);
    }
  }, [userProfile.email, userProfile.userData, theComponent, alertCallback]);

  const theAction = {
    [Workflow.PACKAGE_ACTION.WITHDRAW]: () => {
      confirmAction &&
        confirmAction(
          "Withdraw?",
          "Yes, withdraw",
          "Cancel",
          `You are about to withdraw ${theComponent.componentId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`,
          onPopupActionWithdraw
        );
    },
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
              <Link
                key={`popup-action-${i}`}
                to={toLink[actionName]}
                id={idPre[actionName] + "-" + theComponent.componentId}
                onClick={() => {
                  theAction[actionName] && theAction[actionName]();
                }}
              >
                {popupLabel[actionName]}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
