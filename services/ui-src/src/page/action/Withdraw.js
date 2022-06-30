import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import PackageAPI from "../../utils/PackageApi";
import { useAppContext } from "../../libs/contextLib";
import { ONEMAC_ROUTES } from "cmscommonlib";

export default function Withdraw({ theComponent, alertCallback }) {
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
      to={ONEMAC_ROUTES.PACKAGE_LIST}
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
