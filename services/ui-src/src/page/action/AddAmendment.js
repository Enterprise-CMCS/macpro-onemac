import React from "react";
import { Link } from "react-router-dom";

import {
  ONEMAC_ROUTES,
  waiverAuthorityB4,
  waiverAuthorityB,
} from "cmscommonlib";

export default function AddAmendment({ theComponent }) {
  let amendmentRoute;
  if (theComponent.waiverAuthority === waiverAuthorityB4.value) {
    amendmentRoute = ONEMAC_ROUTES.WAIVER_AMENDMENT_B_4;
  } else if (theComponent.waiverAuthority === waiverAuthorityB.value) {
    amendmentRoute = ONEMAC_ROUTES.WAIVER_AMENDMENT_B_OTHER;
  }

  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: amendmentRoute,
        state: {
          parentId: theComponent.componentId,
        },
      }}
      id={"add-amendment-action-" + theComponent.componentId}
    >
      Add Amendment
    </Link>
  );
}
