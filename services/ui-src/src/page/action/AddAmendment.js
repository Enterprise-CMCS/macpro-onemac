import React from "react";
import { Link } from "react-router-dom";

import { ONEMAC_ROUTES } from "cmscommonlib";

export default function AddAmendment({ theComponent }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: ONEMAC_ROUTES.WAIVER_AMENDMENT,
        state: {
          componentId: theComponent.componentId,
        },
      }}
      id={"add-amendment-action-" + theComponent.componentId}
    >
      Add Amendment
    </Link>
  );
}
