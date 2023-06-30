import React from "react";
import { Link } from "react-router-dom";

import { ONEMAC_ROUTES } from "cmscommonlib";

export default function RequestTemporaryExtension({ theComponent }) {
  return (
    <Link
      key={`popup-action-${theComponent.componentId}`}
      to={{
        pathname: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
        state: {
          parentId: theComponent.componentId,
          parentType: theComponent.componentType,
          temporaryExtensionType: theComponent.temporaryExtensionType,
        },
      }}
      id={"request-temporary-extension-action-" + theComponent.componentId}
    >
      Request Temporary Extension
    </Link>
  );
}
