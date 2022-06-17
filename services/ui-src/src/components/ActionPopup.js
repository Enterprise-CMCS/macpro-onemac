import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { ONEMAC_ROUTES, Workflow } from "cmscommonlib";
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

export default function ActionPopup({ theComponent, alertCallback }) {
  const { userProfile, confirmAction } = useAppContext() ?? {};
  const [showMenu, setShowMenu] = useState(false);
  const availableActions =
    Workflow.ACTIONS[theComponent.componentType][theComponent.currentStatus];

  const toLink = {
    [Workflow.PACKAGE_ACTION.WITHDRAW]: ONEMAC_ROUTES.PACKAGE_LIST,
    [Workflow.PACKAGE_ACTION
      .RESPOND_TO_RAI]: `${ONEMAC_ROUTES.MEDICAID_SPA}&componentId=${theComponent.componentId}`,
    [Workflow.PACKAGE_ACTION
      .REQUEST_TEMPORARY_EXTENSION]: `${ONEMAC_ROUTES.TEMPORARY_EXTENSION}&parentId=${theComponent.componentId}`,
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
        <div data-testid="action-popup" className="dropdown-content">
          {availableActions.map((actionName, i) => (
            <Link
              key={`popup-action-${i}`}
              to={toLink[actionName]}
              id={idPre[actionName] + "-" + theComponent.componentId}
              onClick={() => {
                theAction[actionName] && theAction[actionName]();
                setShowMenu(false);
              }}
            >
              {popupLabel[actionName]}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
