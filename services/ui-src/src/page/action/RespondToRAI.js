import React from "react";
import { Link } from "react-router-dom";

import { ONEMAC_ROUTES, Workflow } from "cmscommonlib";

const RAILink = {
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA]: ONEMAC_ROUTES.MEDICAID_SPA_RAI,
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: ONEMAC_ROUTES.CHIP_SPA_RAI,
  [Workflow.ONEMAC_TYPE.BASE_WAIVER]: "",
};

export default function RespondToRAI({ theComponent }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: RAILink[theComponent.componentType],
        state: {
          componentId: theComponent.componentId,
        },
      }}
      id={"respond-rai-action-" + theComponent.componentId}
    >
      Respond to RAI
    </Link>
  );
}
