import React from "react";
import TriageExternalLandingPage, {
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
          packages are submitted within the MACPro system.
        </b>
      </p>
      <p>
        The MACPro system allows CMS and states to collaborate online to process
        certain types of Medicaid SPA submissions.
      </p>
    </>
  ),
  buttonLabel: "Enter the MACPro system",
};

const MedicaidEligibilityLandingPage = () => (
  <TriageExternalLandingPage {...medicaidEligibilityLandingConfig} />
);

export default MedicaidEligibilityLandingPage;