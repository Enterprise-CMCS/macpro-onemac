import React from "react";
import { Link } from "react-router-dom";

import { ONEMAC_ROUTES } from "cmscommonlib";

export default function DisableWithdraw({ theComponent }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: ONEMAC_ROUTES.DISABLE_RAI_WITHDRAW,
        state: {
          componentId: theComponent.componentId,
          parentType: theComponent.componentType,
        },
      }}
      id={"disable-withdraw-action-" + theComponent.componentId}
    >
      Disable Formal RAI Response Withdraw
    </Link>
  );
}
