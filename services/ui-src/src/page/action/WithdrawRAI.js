import React from "react";
import { Link } from "react-router-dom";

import { ONEMAC_ROUTES } from "cmscommonlib";

export default function WithdrawRAI({ theComponent, formSource }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: ONEMAC_ROUTES.WITHDRAW_RAI,
        state: {
          componentId: theComponent.componentId,
          parentId: theComponent.componentId,
          parentType: theComponent.componentType,
          formSource: formSource,
        },
      }}
      id={"withdraw-request-action-" + theComponent.componentId}
    >
      Withdraw Formal RAI Response
    </Link>
  );
}
