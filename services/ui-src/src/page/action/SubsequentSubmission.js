import React from "react";
import { Link } from "react-router-dom";
import { Workflow } from "cmscommonlib";

import { ONEMAC_ROUTES } from "cmscommonlib";

export default function SubsequentSubmission({ theComponent }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: ONEMAC_ROUTES.PACKAGE_LIST,
        state: {
          componentId: theComponent.componentId,
        },
      }}
      id={"subsequent-submission-action-" + theComponent.componentId}
    >
      ${Workflow.PACKAGE_ACTION.SUBSEQUENT_SUBMISSION}
    </Link>
  );
}
