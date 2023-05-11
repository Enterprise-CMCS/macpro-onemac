import React from "react";
import TriageExternalLandingPage, {
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /chip-eligibility
export const chipEligibilityLandingConfig: TriageLandingPageConfig = {
  pageTitle: "CHIP Eligibility SPAs",
  logoJSX: <img src="/assets/images/logos/mmdl.png" alt="MMDL Logo" />,
  descriptionJSX: (
    <>
      <p>
        CHIP Eligibility SPAs are managed within the Medicaid Model Data Lab
        (MMDL).
      </p>
      <p>
        The MMDL system allows states to apply for changes to their State plan,
        and access report on Medicaid program administration/implementation.
      </p>
    </>
  ),
  buttonLabel: "Enter the MMDL system",
};

const CHIPEligibilityLandingPage = () => (
  <TriageExternalLandingPage {...chipEligibilityLandingConfig} />
);

export default CHIPEligibilityLandingPage;
