import React from "react";
import TriageExternalLandingPage, {
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /medicaid-eligibility
export const medicaidEligibilityLandingConfig: TriageLandingPageConfig = {
  pageTitle:
    "Medicaid Eligibility, Enrollment, Administration, and Health Homes",
  logoJSX: <></>,
  descriptionJSX: <></>,
  buttonLabel: "",
};

const MedicaidEligibilityLandingPage = () => (
  <TriageExternalLandingPage {...medicaidEligibilityLandingConfig} />
);

export default MedicaidEligibilityLandingPage;
