import React from "react";
import TriageExternalLandingPage, {
  ExternalSystem,
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /chip-eligibility
export const chipEligibilityLandingConfig: TriageLandingPageConfig = {
  pageTitle: "CHIP Eligibility SPAs",
  logoJSX: <img src="/assets/images/logos/mmdl.png" alt="MMDL Logo" />,
  descriptionJSX: (
    <>
      <p>
        <b>
          CHIP Eligibility SPAs are managed within the{" "}
          <a href={ExternalSystem.MMDL} target="_blank" rel="noreferrer">
            Medicaid Model Data Lab (MMDL)
          </a>
          .
        </b>
      </p>
      <p>
        The MMDL system allows states to apply for changes to their State plan,
        and access report on Medicaid program administration/implementation.
      </p>
    </>
  ),
  buttonLabel: "Enter the MMDL system",
  buttonLink: ExternalSystem.MMDL,
};

const CHIPEligibilityLandingPage = () => (
  <TriageExternalLandingPage {...chipEligibilityLandingConfig} />
);

export default CHIPEligibilityLandingPage;
