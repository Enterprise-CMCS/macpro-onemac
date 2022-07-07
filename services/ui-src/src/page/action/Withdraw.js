import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import PackageAPI from "../../utils/PackageApi";
import { useAppContext } from "../../libs/contextLib";

export default function Withdraw({ theComponent, alertCallback }) {
  const landOn = useLocation();
  const { userProfile, confirmAction } = useAppContext() ?? {};

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

  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={landOn.pathname}
      onClick={() => {
        confirmAction &&
          confirmAction(
            "Withdraw?",
            "Yes, withdraw",
            "Cancel",
            `You are about to withdraw ${theComponent.componentId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`,
            onPopupActionWithdraw
          );
      }}
      id={"withdraw-action-" + theComponent.componentId}
    >
      Withdraw
    </Link>
  );
}
