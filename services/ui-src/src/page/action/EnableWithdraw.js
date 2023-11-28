import React from "react";
import { Link } from "react-router-dom";

import { ONEMAC_ROUTES } from "cmscommonlib";

export default function EnableWithdraw({ theComponent }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: ONEMAC_ROUTES.ENABLE_RAI_WITHDRAW,
        state: {
          componentId: theComponent.componentId,
          parentType: theComponent.componentType,
        },
      }}
      id={"enable-withdraw-action-" + theComponent.componentId}
    >
      Enable Formal RAI Response Withdraw
    </Link>
  );
}
