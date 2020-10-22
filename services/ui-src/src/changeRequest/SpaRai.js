import React from "react";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import RaiTemplate from "./RaiTemplate";

/**
 * SpaRai acts as a wrapper around RaiTemplate to render custom RAI form for a SPA RAI
 */
export default function SpaRai() {
  const requiredUploads = ["RAI Response"];
  const optionalUploads = [
    "CMS Form 179",
    "SPA Pages",
    "Cover Letter",
    "Existing state plan pages",
    "Tribal Consultation",
    "Public Notice",
    "Standard Funding Questions (SFQs)",
    "Other",
  ];

  return (
    <RaiTemplate
      changeRequestType={CHANGE_REQUEST_TYPES.SPA_RAI}
      optionalUploads={optionalUploads}
      requiredUploads={requiredUploads}
      raiType="SPA"
    />
  );
}
