import React from "react";
import { Link } from "react-router-dom";
import { Workflow } from "cmscommonlib";

import { ONEMAC_ROUTES } from "cmscommonlib";

const submissionLink = {
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA]:
    ONEMAC_ROUTES.MEDICAID_SPA_SUBSEQUENT_SUBMSISSION,
  [Workflow.ONEMAC_TYPE.CHIP_SPA]:
    ONEMAC_ROUTES.CHIP_SPA_SUBSEQUENT_SUBMSISSION,
  [Workflow.ONEMAC_TYPE.CHIP_SPA]:
    ONEMAC_ROUTES.CHIP_SPA_SUBSEQUENT_SUBMSISSION,
  [Workflow.ONEMAC_TYPE.WAIVER_INITIAL]:
    ONEMAC_ROUTES.INITIAL_WAIVER_SUBSEQUENT_SUBMSISSION,
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]:
    ONEMAC_ROUTES.WAIVER_RENEWAL_SUBSEQUENT_SUBMSISSION,
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]:
    ONEMAC_ROUTES.WAIVER_AMENDMENT_SUBSEQUENT_SUBMSISSION,
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K]:
    ONEMAC_ROUTES.WAIVER_APP_K_SUBSEQUENT_SUBMSISSION,
};

export default function SubsequentSubmission({ theComponent }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: submissionLink[theComponent.componentType],
        state: {
          componentId: theComponent.componentId,
          parentType: theComponent.componentType,
          waiverAuthority: theComponent.waiverAuthority,
        },
      }}
      id={"subsequent-submission-action-" + theComponent.componentId}
    >
      {Workflow.PACKAGE_ACTION.SUBSEQUENT_SUBMISSION}
    </Link>
  );
}
