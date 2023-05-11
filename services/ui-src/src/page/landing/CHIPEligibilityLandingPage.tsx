import React from "react";
import TriageExternalLandingPage, {
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /chip-eligibility
export const chipEligibilityLandingConfig: TriageLandingPageConfig = {
  pageTitle: "CHIP Eligibility SPAs",
  logoJSX: <></>,
  descriptionJSX: <></>,
  buttonLabel: "",
};

const CHIPEligibilityLandingPage = () => (
  <TriageExternalLandingPage {...chipEligibilityLandingConfig} />
);

export default CHIPEligibilityLandingPage;
