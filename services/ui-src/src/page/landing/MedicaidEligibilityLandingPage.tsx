import React from "react";
import TriageExternalLandingPage, {
  ExternalSystem,
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /medicaid-eligibility
export const medicaidEligibilityLandingConfig: TriageLandingPageConfig = {
  pageTitle:
    "Medicaid Eligibility, Enrollment, Administration, and Health Homes",
  logoJSX: <img src="/assets/images/logos/macpro.png" alt="MacPRO Logo" />,
  descriptionJSX: (
    <>
      <p>
        <b>
          Medicaid Eligibility, Enrollment, Administration, and Health Homes SPA
          packages are submitted within the{" "}
          <a href={ExternalSystem.MAC_PRO} target="_blank" rel="noreferrer">
            MACPro system.
          </a>
        </b>
      </p>
      <p>
        The MACPro system allows CMS and states to collaborate online to process
        certain types of Medicaid SPA submissions.
      </p>
    </>
  ),
  buttonLabel: "Enter the MACPro system",
  buttonLink: ExternalSystem.MAC_PRO,
};

const MedicaidEligibilityLandingPage = () => (
  <TriageExternalLandingPage {...medicaidEligibilityLandingConfig} />
);

export default MedicaidEligibilityLandingPage;
