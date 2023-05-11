import React from "react";
import { Link } from "react-router-dom";

import { ONEMAC_ROUTES, Workflow } from "cmscommonlib";

const WithdrawLink = {
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA]: ONEMAC_ROUTES.MEDICAID_SPA_WITHDRAW,
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: ONEMAC_ROUTES.CHIP_SPA_WITHDRAW,
  [Workflow.ONEMAC_TYPE.WAIVER_INITIAL]: ONEMAC_ROUTES.INITIAL_WAIVER_WITHDRAW,
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]: ONEMAC_ROUTES.WAIVER_RENEWAL_WITHDRAW,
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]:
    ONEMAC_ROUTES.WAIVER_AMENDMENT_WITHDRAW,
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K]:
    ONEMAC_ROUTES.APPENDIX_K_AMENDMENT_WITHDRAW,
};

export default function Withdraw({ theComponent, formSource }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: WithdrawLink[theComponent.componentType],
        state: {
          componentId: theComponent.componentId,
          parentId: theComponent.componentId,
          parentType: theComponent.componentType,
          formSource: formSource,
        },
      }}
      id={"withdraw-request-action-" + theComponent.componentId}
    >
      Withdraw Package
    </Link>
  );
}
